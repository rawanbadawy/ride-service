export declare class Ride {
    id: string;
    driverId: string;
    destination: string;
    meetingPoint: string;
    zoneName: string;
    dateTime: Date;
    seats: number;
    price: number;
    isGirlsOnly: boolean;
    status: string;
    createdAt: Date;
    updatedAt: Date;
}
export declare class RidePrice {
    meetingPoint: string;
    priceToGIU: number;
    distanceToGIU: number;
}
