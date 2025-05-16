import { ObjectType, Field, ID, Int, Float } from '@nestjs/graphql';

@ObjectType()
export class Ride {
  @Field(() => ID)
  id!: string;

  @Field()
  driverId!: string;

  @Field()
  destination!: string;

  @Field()
  meetingPoint!: string;

  @Field()
  dateTime!: Date;

  @Field()
  seats!: number;

  @Field()
  price!: number;

  @Field()
  pricePerSeat!: number;

  @Field()
  isGirlsOnly!: boolean;

  @Field()
  status!: string;

  @Field()
  createdAt!: Date;

  @Field()
  updatedAt!: Date;
}

@ObjectType()
export class RidePrice {
  @Field()
  meetingPoint!: string;

  @Field()
  priceToGIU!: number;

  @Field()
  distanceToGIU!: number;
}

@ObjectType()
export class MeetingPoint {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field()
  distanceToGIU: number;

  @Field()
  priceToGIU: number;

  @Field(() => Int)
  routeId: number;
}

@ObjectType()
export class Route {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field(() => Int)
  zoneId: number;

  @Field(() => [MeetingPoint])
  meetingPoints: MeetingPoint[];
}

@ObjectType()
export class Zone {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field(() => [Route])
  routes: Route[];
}