import { ObjectType, Field, ID, Float } from '@nestjs/graphql';

@ObjectType()
export class Ride {
    @Field(() => ID)
    id: string;

    @Field()
    driverId: string;

    @Field()
    destination: string;

    @Field()
    meetingPoint: string;

    @Field()
    dateTime: Date;

    @Field(() => Float)
    seats: number;

    @Field(() => Float)
    price: number;

    @Field(() => Float)
    pricePerSeat: number;

    @Field()
    isGirlsOnly: boolean;

    @Field()
    status: string;

    @Field()
    createdAt: Date;

    @Field()
    updatedAt: Date;
} 