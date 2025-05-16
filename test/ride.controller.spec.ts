import { Test, TestingModule } from '@nestjs/testing';
import { RideController } from '../src/ride/ride.controller';
import { RideService } from '../src/ride/ride.service';
import { CreateRideDto } from '../src/ride/dto/create-ride.dto';

describe('RideController', () => {
  let controller: RideController;
  let service: RideService;

  const mockRideService = {
    createRide: jest.fn(dto => ({
      id: 'ride123',
      ...dto,
      price: 50,
      pricePerSeat: 12.5,
    })),
    getRides: jest.fn(() => []),
    getRideById: jest.fn(id => ({ id })),
    updateRide: jest.fn((id, dto) => ({ id, ...dto })),
    deleteRide: jest.fn(id => ({ id, deleted: true })),
    searchRides: jest.fn(() => [{ id: 'ride1' }]),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RideController],
      providers: [
        {
          provide: RideService,
          useValue: mockRideService,
        },
      ],
    }).compile();

    controller = module.get<RideController>(RideController);
    service = module.get<RideService>(RideService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a ride', async () => {
    const dto: CreateRideDto = {
      driverId: 'driver123',
      destination: 'GIU',
      meetingPoint: 'City Stars',
      seats: 4,
      isGirlsOnly: false,
      zoneName: 'Nasr City',
    };
    const result = await controller.createRide(dto);
    expect(result).toEqual({
      id: 'ride123',
      ...dto,
      price: 50,
      pricePerSeat: 12.5,
    });
    expect(service.createRide).toHaveBeenCalledWith(dto);
  });

  it('should return all rides', async () => {
    const rides = await controller.getRides();
    expect(rides).toEqual([]);
  });

  it('should return ride by ID', async () => {
    const ride = await controller.getRideById('ride123');
    expect(ride).toEqual({ id: 'ride123' });
  });

  it('should delete a ride', async () => {
    const result = await controller.deleteRide('ride123');
    expect(result).toEqual({ id: 'ride123', deleted: true });
  });

  it('should search rides', async () => {
    const result = await controller.searchRides('GIU', 'City Stars');
    expect(result).toEqual([{ id: 'ride1' }]);
  });
});
