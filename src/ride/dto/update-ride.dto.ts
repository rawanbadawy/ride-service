import { InputType, PartialType } from '@nestjs/graphql';
import { CreateRideDto } from './create-ride.dto';

@InputType()
export class UpdateRideDto extends PartialType(CreateRideDto) {}