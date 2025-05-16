import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { RideService } from './ride.service';
import { Ride, RidePrice, Zone } from './ride.model';
import { CreateRideDto } from './dto/create-ride.dto';
import { UpdateRideDto } from './dto/update-ride.dto';
import { CreateZoneDto } from './dto/create-zone.dto';
import { RabbitMQService } from 'src/rabbitmq/rabbitmq.service';
import { RideFiltersInput } from 'src/ride-filters.input';


@Resolver(() => Ride)
export class RideResolver {
  constructor(private readonly rideService: RideService) { }

  @Query(() => [Ride])
  getRides(
    @Args('filters', { nullable: true }) filters: RideFiltersInput,
    @Args('searchTerm', { nullable: true }) searchTerm: string,
  ): Promise<Ride[]> {
    return this.rideService.findRides(filters, searchTerm);
  }

  @Query(() => Ride, { nullable: true })
  getRideById(@Args('id') id: string) {
    return this.rideService.getRideById(id);
  }

  @Mutation(() => Ride)
  createRide(@Args('data', { type: () => CreateRideDto }) data: CreateRideDto) {
    return this.rideService.createRide(data);
  }

  @Mutation(() => Ride)
  updateRide(@Args('id') id: string, @Args('data') data: UpdateRideDto) {
    return this.rideService.updateRide(id, data);
  }

  @Mutation(() => Ride)
  deleteRide(@Args('id') id: string) {
    return this.rideService.deleteRide(id);
  }

  @Mutation(() => RidePrice)
  calculateRidePrice(
    @Args('zoneName') zoneName: string,
    @Args('routeName') routeName: string,
    @Args('meetingPointName') meetingPointName: string,
  ) {
    return this.rideService.calculateRidePrice(zoneName, routeName, meetingPointName);
  }

  @Query(() => [Ride])
  async getRidesByDriverId(@Args('driverId', { type: () => String }) driverId: string) {
    const rides = await this.rideService.getRidesByDriverId(driverId);
    return rides;
  }
}