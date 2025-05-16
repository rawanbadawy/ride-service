import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class DateTimeFilter {
  @Field({ nullable: true })
  gte?: Date;
}

@InputType()
export class RideFiltersInput {
  @Field({ nullable: true })
  meetingPoint?: string;

  @Field({ nullable: true })
  destination?: string;

  @Field({ nullable: true })
  dateTime?: DateTimeFilter;

  @Field({ nullable: true })
  isGirlsOnly?: boolean;
}