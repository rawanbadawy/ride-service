import { Test, TestingModule } from '@nestjs/testing';
import { RideService } from '../src/ride/ride.service';
import { PrismaService } from '../src/prisma/prisma.service';
import { RabbitMQService } from '../src/rabbitmq/rabbitmq.service';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { CreateRideDto } from '../src/ride/dto/create-ride.dto'; // Assuming the DTO is at this location

describe('RideService', () => {
  let service: RideService;
  let prisma: PrismaService;

  const mockPrismaService = {
    ride: {
      findMany: jest.fn().mockResolvedValue([]),
      findUnique: jest.fn().mockResolvedValue(null),
      create: jest.fn().mockImplementation((data) => ({
        id: 'ride123',
        ...data,
      })),
      update: jest.fn().mockImplementation((_, data) => data),
      delete: jest.fn().mockResolvedValue({ id: 'ride123', deleted: true }),
    },
    meetingPoint: {
      findUnique: jest.fn().mockResolvedValue({
        name: 'City Stars',
        distanceToGIU: 10,
      }),
    },
  };

  const mockRabbitMQService = {
    publish: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RideService,
        { provide: PrismaService, useValue: mockPrismaService },
        { provide: RabbitMQService, useValue: mockRabbitMQService },
      ],
    }).compile();

    service = module.get<RideService>(RideService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should throw if meeting point is not found', async () => {
    mockPrismaService.meetingPoint.findUnique.mockResolvedValueOnce(null);

    await expect(
      service.createRide({
        driverId: 'driver123',
        destination: 'GIU',
        meetingPoint: 'Unknown Point',
        seats: 4,
        isGirlsOnly: false,
        zoneName: 'Nasr City',
      } as any),
    ).rejects.toThrow(NotFoundException);
  });

  it('should throw if destination and meetingPoint both are not GIU', async () => {
    await expect(
      service.createRide({
        driverId: 'driver123',
        destination: 'Downtown',
        meetingPoint: 'City Stars',
        seats: 4,
        isGirlsOnly: false,
        zoneName: 'Nasr City',
      } as any),
    ).rejects.toThrow(ConflictException);
  });
});
