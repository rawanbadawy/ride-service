import { PrismaService } from '../prisma/prisma.service';
import { CreateRideDto } from './dto/create-ride.dto';
import { UpdateRideDto } from './dto/update-ride.dto';
import { ClientProxy } from '@nestjs/microservices';
export declare class RideService {
    private readonly prisma;
    private readonly client;
    constructor(prisma: PrismaService, client: ClientProxy);
    getRides(): Promise<{
        id: string;
        driverId: string;
        destination: string;
        meetingPoint: string;
        dateTime: Date;
        seats: number;
        price: number;
        isGirlsOnly: boolean;
        status: string;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    getRideById(id: string): Promise<{
        id: string;
        driverId: string;
        destination: string;
        meetingPoint: string;
        dateTime: Date;
        seats: number;
        price: number;
        isGirlsOnly: boolean;
        status: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    createRide(data: CreateRideDto): Promise<{
        id: string;
        driverId: string;
        destination: string;
        meetingPoint: string;
        dateTime: Date;
        seats: number;
        price: number;
        isGirlsOnly: boolean;
        status: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    updateRide(id: string, data: UpdateRideDto): Promise<{
        id: string;
        driverId: string;
        destination: string;
        meetingPoint: string;
        dateTime: Date;
        seats: number;
        price: number;
        isGirlsOnly: boolean;
        status: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    deleteRide(id: string): Promise<{
        id: string;
        driverId: string;
        destination: string;
        meetingPoint: string;
        dateTime: Date;
        seats: number;
        price: number;
        isGirlsOnly: boolean;
        status: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    searchRides(destination: string, meetingPoint: string): Promise<{
        id: string;
        driverId: string;
        destination: string;
        meetingPoint: string;
        dateTime: Date;
        seats: number;
        price: number;
        isGirlsOnly: boolean;
        status: string;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
}
