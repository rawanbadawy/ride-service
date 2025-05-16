import { Module } from '@nestjs/common';
import { RideService } from './ride.service';
import { RideResolver } from './ride.resolver';
import { ZoneResolver } from './zone.resolver'; // ✅
import { PrismaService } from '../prisma/prisma.service';
import { RabbitMQService } from '../rabbitmq/rabbitmq.service';

@Module({
  providers: [
    RideService,
    RideResolver,
    ZoneResolver, // ✅ This must be here
    PrismaService,
    RabbitMQService,
  ],
})
export class RideModule { }