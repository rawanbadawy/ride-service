declare class CreateMeetingPointDto {
    name: string;
    distanceToGIU: number;
}
declare class CreateRouteDto {
    name: string;
    meetingPoints: CreateMeetingPointDto[];
}
export declare class CreateZoneDto {
    name: string;
    routes: CreateRouteDto[];
}
export {};
