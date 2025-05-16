"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RideService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const payment_service_1 = require("../../../payment-service/src/payment/payment.service");
let RideService = class RideService {
    constructor(prisma, paymentService) {
        this.prisma = prisma;
        this.paymentService = paymentService;
    }
    async getRides() {
        return this.prisma.ride.findMany();
    }
    async getRideById(id) {
        const ride = await this.prisma.ride.findUnique({ where: { id } });
        if (!ride) {
            throw new common_1.NotFoundException(`Ride with ID ${id} not found.`);
        }
        return ride;
    }
    async createRide(data) {
        if (data.destination !== "GIU" && data.meetingPoint !== "GIU") {
            throw new common_1.ConflictException('Either the destination or the meetingPoint must be GIU.');
        }
        const meetingPoint = await this.prisma.meetingPoint.findUnique({
            where: { name: data.meetingPoint },
        });
        if (!meetingPoint) {
            throw new common_1.NotFoundException(`Meeting point ${data.meetingPoint} not found.`);
        }
        const priceToGIU = this.calculatePrice(meetingPoint.distanceToGIU);
        const dateTime = data.dateTime || new Date();
        return this.prisma.ride.create({
            data: {
                driverId: data.driverId,
                destination: data.destination,
                meetingPoint: data.meetingPoint,
                dateTime: dateTime,
                seats: data.seats,
                price: priceToGIU,
                isGirlsOnly: data.isGirlsOnly,
                status: 'PENDING',
                zoneName: data.zoneName,
            },
        });
    }
    calculatePrice(distance) {
        return distance * 5;
    }
    async updateRide(id, data) {
        const existingRide = await this.prisma.ride.findUnique({ where: { id } });
        if (!existingRide) {
            throw new common_1.NotFoundException(`Ride with ID ${id} not found.`);
        }
        if (existingRide.status !== 'PENDING') {
            throw new common_1.ConflictException(`Ride with ID ${id} cannot be updated because it's not in 'PENDING' status.`);
        }
        return this.prisma.ride.update({
            where: { id },
            data,
        });
    }
    async deleteRide(id) {
        const ride = await this.prisma.ride.findUnique({ where: { id } });
        if (!ride) {
            throw new common_1.NotFoundException(`Ride with ID ${id} not found.`);
        }
        return this.prisma.ride.delete({
            where: { id },
        });
    }
    async searchRides(destination, meetingPoint) {
        return this.prisma.ride.findMany({
            where: {
                destination: {
                    contains: destination,
                    mode: 'insensitive',
                },
                meetingPoint: {
                    contains: meetingPoint,
                    mode: 'insensitive',
                },
            },
        });
    }
    async calculateRidePrice(zoneName, routeName, meetingPointName) {
        const zone = await this.prisma.zone.findFirst({
            where: { name: zoneName },
            include: {
                routes: {
                    where: { name: routeName },
                    include: {
                        meetingPoints: {
                            where: { name: meetingPointName },
                        },
                    },
                },
            },
        });
        if (!zone)
            throw new common_1.NotFoundException(`Zone with name ${zoneName} not found.`);
        const route = zone.routes[0];
        if (!route)
            throw new common_1.NotFoundException(`Route with name ${routeName} not found in zone ${zoneName}.`);
        const meetingPoint = route.meetingPoints[0];
        if (!meetingPoint)
            throw new common_1.NotFoundException(`Meeting point with name ${meetingPointName} not found in route ${routeName}.`);
        return {
            meetingPoint: meetingPoint.name,
            distanceToGIU: meetingPoint.distanceToGIU,
            priceToGIU: meetingPoint.priceToGIU,
        };
    }
};
exports.RideService = RideService;
exports.RideService = RideService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        payment_service_1.PaymentService])
], RideService);
//# sourceMappingURL=ride.service.js.map