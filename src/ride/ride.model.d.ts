export declare class Ride {
    id: string;
    driverId: string;
    destination: string;
    meetingPoint: string;
    dateTime: Date;
    seats: number;
    price: number;
    pricePerSeat: number;
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
export declare class MeetingPoint {
    id: number;
    name: string;
    distanceToGIU: number;
    priceToGIU: number;
    routeId: number;
}
export declare class Route {
    id: number;
    name: string;
    zoneId: number;
    meetingPoints: MeetingPoint[];
}
export declare class Zone {
    id: number;
    name: string;
    routes: Route[];
}
