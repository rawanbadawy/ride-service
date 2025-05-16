import { Injectable } from '@nestjs/common';
import { ClientProxy, Client, Transport } from '@nestjs/microservices';

@Injectable()
export class RabbitMQService {
  @Client({
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://localhost:5672'], // Ensure this points to your RabbitMQ server
      queue: 'ride.created',
    },
  })
  client: ClientProxy;

  async publish(pattern: string, data: any) {
    return this.client.emit(pattern, data).toPromise();
  }
}
