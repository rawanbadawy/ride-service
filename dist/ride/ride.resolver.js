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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RideResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const ride_service_1 = require("./ride.service");
const ride_model_1 = require("./ride.model");
const create_ride_dto_1 = require("./dto/create-ride.dto");
const update_ride_dto_1 = require("./dto/update-ride.dto");
const ride_filters_input_1 = require("../ride-filters.input");
let RideResolver = class RideResolver {
    constructor(rideService) {
        this.rideService = rideService;
    }
    getRides(filters, searchTerm) {
        return this.rideService.findRides(filters, searchTerm);
    }
    getRideById(id) {
        return this.rideService.getRideById(id);
    }
    createRide(data) {
        return this.rideService.createRide(data);
    }
    updateRide(id, data) {
        return this.rideService.updateRide(id, data);
    }
    deleteRide(id) {
        return this.rideService.deleteRide(id);
    }
    calculateRidePrice(zoneName, routeName, meetingPointName) {
        return this.rideService.calculateRidePrice(zoneName, routeName, meetingPointName);
    }
    async getRidesByDriverId(driverId) {
        const rides = await this.rideService.getRidesByDriverId(driverId);
        return rides;
    }
};
exports.RideResolver = RideResolver;
__decorate([
    (0, graphql_1.Query)(() => [ride_model_1.Ride]),
    __param(0, (0, graphql_1.Args)('filters', { nullable: true })),
    __param(1, (0, graphql_1.Args)('searchTerm', { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ride_filters_input_1.RideFiltersInput, String]),
    __metadata("design:returntype", Promise)
], RideResolver.prototype, "getRides", null);
__decorate([
    (0, graphql_1.Query)(() => ride_model_1.Ride, { nullable: true }),
    __param(0, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RideResolver.prototype, "getRideById", null);
__decorate([
    (0, graphql_1.Mutation)(() => ride_model_1.Ride),
    __param(0, (0, graphql_1.Args)('data', { type: () => create_ride_dto_1.CreateRideDto })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_ride_dto_1.CreateRideDto]),
    __metadata("design:returntype", void 0)
], RideResolver.prototype, "createRide", null);
__decorate([
    (0, graphql_1.Mutation)(() => ride_model_1.Ride),
    __param(0, (0, graphql_1.Args)('id')),
    __param(1, (0, graphql_1.Args)('data')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_ride_dto_1.UpdateRideDto]),
    __metadata("design:returntype", void 0)
], RideResolver.prototype, "updateRide", null);
__decorate([
    (0, graphql_1.Mutation)(() => ride_model_1.Ride),
    __param(0, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RideResolver.prototype, "deleteRide", null);
__decorate([
    (0, graphql_1.Mutation)(() => ride_model_1.RidePrice),
    __param(0, (0, graphql_1.Args)('zoneName')),
    __param(1, (0, graphql_1.Args)('routeName')),
    __param(2, (0, graphql_1.Args)('meetingPointName')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", void 0)
], RideResolver.prototype, "calculateRidePrice", null);
__decorate([
    (0, graphql_1.Query)(() => [ride_model_1.Ride]),
    __param(0, (0, graphql_1.Args)('driverId', { type: () => String })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RideResolver.prototype, "getRidesByDriverId", null);
exports.RideResolver = RideResolver = __decorate([
    (0, graphql_1.Resolver)(() => ride_model_1.Ride),
    __metadata("design:paramtypes", [ride_service_1.RideService])
], RideResolver);
//# sourceMappingURL=ride.resolver.js.map