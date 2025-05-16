import { Module } from '@nestjs/common';
import { RideModule } from './ride/ride.module';
import { PrismaService } from './prisma/prisma.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
  imports: [
    RideModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'), // Automatically generate schema
      playground: true, // Enable GraphQL Playground for easy testing
      // Optional: You can customize the GraphQL path if needed
      // path: '/api/graphql', 
    }),
    CqrsModule,
  ],
  providers: [PrismaService],
})
export class AppModule {}