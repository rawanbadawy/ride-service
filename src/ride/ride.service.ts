import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateRideDto } from './dto/create-ride.dto';
import { UpdateRideDto } from './dto/update-ride.dto';
import { CreateZoneDto } from './dto/create-zone.dto';
import { RabbitMQService } from 'src/rabbitmq/rabbitmq.service';

@Injectable()
export class RideService {
  constructor(private readonly prisma: PrismaService,
    private readonly rabbitMQService: RabbitMQService,

  ) { }

  async getRides() {
    return this.prisma.ride.findMany();
  }

  async findRides(filters?: any, searchTerm?: string) {
    const where: any = {};

    // Girls-only filter
    if (filters?.isGirlsOnly) {
      where.isGirlsOnly = true;
    }

    // Meeting point filter
    if (filters?.meetingPoint) {
      where.meetingPoint = filters.meetingPoint;
    }

    // Destination filter
    if (filters?.destination) {
      where.destination = filters.destination;
    }

    // DateTime filter (gte)
    if (filters?.dateTime?.gte) {
      where.dateTime = { gte: filters.dateTime.gte };
    }

    // Search term across destination and meetingPoint
    if (searchTerm) {
      where.OR = [
        { destination: { contains: searchTerm, mode: 'insensitive' } },
        { meetingPoint: { contains: searchTerm, mode: 'insensitive' } },
      ];
    }

    return this.prisma.ride.findMany({ where });
  }

  async getRideById(id: string) {
    const ride = await this.prisma.ride.findUnique({ where: { id } });
    if (!ride) {
      throw new NotFoundException(`Ride with ID ${id} not found.`);
    }
    return ride;
  }

  async createRide(data: CreateRideDto) {
    if (data.destination !== 'GIU' && data.meetingPoint !== 'GIU') {
      throw new ConflictException('Either the destination or the meetingPoint must be GIU.');
    }

    let meetingPoint = await this.prisma.meetingPoint.findUnique({
      where: { name: data.meetingPoint },
    });

    if (!meetingPoint) {
      throw new NotFoundException(`Meeting point ${data.meetingPoint} not found.`);
    }

    // If meetingPoint is GIU, set it to the destination and fetch the destination's data
    if (meetingPoint.name === 'GIU') {
      const destination = await this.prisma.meetingPoint.findUnique({
        where: { name: data.destination },
      });

      meetingPoint = destination; // Update meeting point to destination
    }

    const priceToGIU = this.calculatePrice(meetingPoint.distanceToGIU);
    const pricePerSeat = priceToGIU / data.seats;

    return this.prisma.ride.create({
      data: {
        driverId: data.driverId,
        destination: data.destination,
        meetingPoint: meetingPoint.name,
        dateTime: data.dateTime || new Date(),
        seats: data.seats,
        price: priceToGIU,
        pricePerSeat,
        isGirlsOnly: data.isGirlsOnly,
        status: 'PENDING',
      },
    });
  }

  private calculatePrice(distance: number): number {
    return distance * 5;
  }

  

  async updateRide(id: string, data: UpdateRideDto) {
    const existingRide = await this.prisma.ride.findUnique({ where: { id } });
    if (!existingRide) {
      throw new NotFoundException(`Ride with ID ${id} not found.`);
    }

    if (existingRide.status !== 'PENDING') {
      throw new ConflictException(`Ride with ID ${id} cannot be updated because it's not in 'PENDING' status.`);
    }

    return this.prisma.ride.update({
      where: { id },
      data,
    });
  }

  async deleteRide(id: string) {
    const ride = await this.prisma.ride.findUnique({ where: { id } });
    if (!ride) {
      throw new NotFoundException(`Ride with ID ${id} not found.`);
    }

    return this.prisma.ride.delete({
      where: { id },
    });
  }

  async searchRides(destination: string, meetingPoint: string) {
    return this.prisma.ride.findMany({
      where: {
        destination: {
          contains: destination,
          mode: 'insensitive',
        },
        meetingPoint: {
          contains: meetingPoint,
          mode: 'insensitive',
        },
      },
    });
  }

  async createZone(data: CreateZoneDto) {
    return this.prisma.zone.create({
      data: {
        name: data.name,
        routes: {
          create: data.routes.map((route) => ({
            name: route.name,
            meetingPoints: {
              create: route.meetingPoints.map((mp) => ({
                name: mp.name,
                distanceToGIU: mp.distanceToGIU,
                priceToGIU: mp.distanceToGIU * 5,
              })),
            },
          })),
        },
      },
      include: {
        routes: { include: { meetingPoints: true } },
      },
    });
  }

  async getZones() {
    return this.prisma.zone.findMany({
      include: {
        routes: {
          include: {
            meetingPoints: true,
          },
        },
      },
    });
  }

  async calculateRidePrice(zoneName: string, routeName: string, meetingPointName: string): Promise<any> {
    const zone = await this.prisma.zone.findFirst({
      where: { name: zoneName },
      include: {
        routes: {
          where: { name: routeName },
          include: {
            meetingPoints: {
              where: { name: meetingPointName },
            },
          },
        },
      },
    });

    if (!zone) throw new NotFoundException(`Zone with name ${zoneName} not found.`);

    const route = zone.routes[0];
    if (!route) throw new NotFoundException(`Route with name ${routeName} not found in zone ${zoneName}.`);

    const meetingPoint = route.meetingPoints[0];
    if (!meetingPoint) throw new NotFoundException(`Meeting point with name ${meetingPointName} not found in route ${routeName}.`);

    return {
      meetingPoint: meetingPoint.name,
      distanceToGIU: meetingPoint.distanceToGIU,
      priceToGIU: meetingPoint.priceToGIU,
    };
  }

  async getRidesByDriverId(driverId: string): Promise<Array<{
    id: string;
    driverId: string;
    destination: string;
    meetingPoint: string;
    dateTime: Date;
    seats: number;
    price: number;
    pricePerSeat: number;
    isGirlsOnly: boolean;
    status: string;
    createdAt: Date;
    updatedAt: Date;
  }>> {
    return this.prisma.ride.findMany({
      where: {
        driverId,
        status: {
          in: ['COMPLETED', 'CANCELLED']
        }
      },
      orderBy: {
        dateTime: 'desc'
      }
    });
  }
  
}