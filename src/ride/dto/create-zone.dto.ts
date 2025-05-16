import { IsString, IsArray, ValidateNested, IsNotEmpty, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateMeetingPointDto {
  @Field()
  @IsString()
  @IsNotEmpty()
  name: string;

  @Field()
  @IsNumber()
  distanceToGIU: number;
}

@InputType()
export class CreateRouteDto {
  @Field()
  @IsString()
  @IsNotEmpty()
  name: string;

  @Field(() => [CreateMeetingPointDto])
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateMeetingPointDto)
  meetingPoints: CreateMeetingPointDto[];
}

@InputType()
export class CreateZoneDto {
  @Field()
  @IsString()
  @IsNotEmpty()
  name: string;

  @Field(() => [CreateRouteDto])
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateRouteDto)
  routes: CreateRouteDto[];
}