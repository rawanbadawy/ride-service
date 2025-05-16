import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { RideService } from './ride.service';
import { Zone } from './ride.model';
import { CreateZoneDto } from './dto/create-zone.dto';
import { PrismaService } from 'src/prisma/prisma.service'; // Import PrismaService

@Resolver(() => Zone)
export class ZoneResolver {
  constructor(
    private readonly rideService: RideService,
    private readonly prisma: PrismaService // Inject PrismaService into the constructor
  ) {}

  // Create a new Zone
  @Mutation(() => Zone)
  createZone(@Args('data') data: CreateZoneDto) {
    return this.rideService.createZone(data);
  }

  // Query to get all zones and their routes with meeting points
  @Query(() => [Zone])
  async getZones() {
    return this.prisma.zone.findMany({
      include: {
        routes: {
          include: {
            meetingPoints: true, // Include meeting points for each route
          },
        },
      },
    });
  }
}
