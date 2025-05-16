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
exports.ZoneResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const ride_service_1 = require("./ride.service");
const ride_model_1 = require("./ride.model");
const create_zone_dto_1 = require("./dto/create-zone.dto");
const prisma_service_1 = require("../prisma/prisma.service");
let ZoneResolver = class ZoneResolver {
    constructor(rideService, prisma) {
        this.rideService = rideService;
        this.prisma = prisma;
    }
    createZone(data) {
        return this.rideService.createZone(data);
    }
    async getZones() {
        return this.prisma.zone.findMany({
            include: {
                routes: {
                    include: {
                        meetingPoints: true,
                    },
                },
            },
        });
    }
};
exports.ZoneResolver = ZoneResolver;
__decorate([
    (0, graphql_1.Mutation)(() => ride_model_1.Zone),
    __param(0, (0, graphql_1.Args)('data')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_zone_dto_1.CreateZoneDto]),
    __metadata("design:returntype", void 0)
], ZoneResolver.prototype, "createZone", null);
__decorate([
    (0, graphql_1.Query)(() => [ride_model_1.Zone]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ZoneResolver.prototype, "getZones", null);
exports.ZoneResolver = ZoneResolver = __decorate([
    (0, graphql_1.Resolver)(() => ride_model_1.Zone),
    __metadata("design:paramtypes", [ride_service_1.RideService,
        prisma_service_1.PrismaService])
], ZoneResolver);
//# sourceMappingURL=zone.resolver.js.map