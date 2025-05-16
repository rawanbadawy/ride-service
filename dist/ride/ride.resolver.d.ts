import { RideService } from './ride.service';
import { Ride } from './ride.model';
import { CreateRideDto } from './dto/create-ride.dto';
import { UpdateRideDto } from './dto/update-ride.dto';
export declare class RideResolver {
    private readonly rideService;
    constructor(rideService: RideService);
    getRides(): Promise<{
        id: string;
        driverId: string;
        destination: string;
        meetingPoint: string;
        dateTime: Date;
        seats: number;
        price: number;
        isGirlsOnly: boolean;
        status: string;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    getRideById(id: string): Promise<{
        id: string;
        driverId: string;
        destination: string;
        meetingPoint: string;
        dateTime: Date;
        seats: number;
        price: number;
        isGirlsOnly: boolean;
        status: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    createRide(data: CreateRideDto): Promise<Ride>;
    updateRide(id: string, data: UpdateRideDto): Promise<Ride>;
    deleteRide(id: string): Promise<Ride>;
}
