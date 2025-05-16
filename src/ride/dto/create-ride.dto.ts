import { IsString, IsNotEmpty, IsDateString, IsNumber, IsBoolean, Min, IsOptional } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateRideDto {
  @Field()
  @IsString()
  @IsNotEmpty()
  driverId!: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  destination!: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  meetingPoint!: string;

  @Field({ nullable: true })
  @IsOptional() 
  @IsDateString()
  dateTime?: Date;

  @Field()
  @IsNumber()
  @Min(1)
  seats!: number;

  @Field()
  @IsBoolean()
  isGirlsOnly!: boolean;

  @Field()
  @IsString()
  @IsNotEmpty()
  zoneName!: string; // Ensure this is passed to connect a ride to a zone
}
