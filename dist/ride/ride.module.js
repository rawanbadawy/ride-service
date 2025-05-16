"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RideModule = void 0;
const common_1 = require("@nestjs/common");
const ride_service_1 = require("./ride.service");
const ride_resolver_1 = require("./ride.resolver");
const zone_resolver_1 = require("./zone.resolver");
const prisma_service_1 = require("../prisma/prisma.service");
const rabbitmq_service_1 = require("../rabbitmq/rabbitmq.service");
let RideModule = class RideModule {
};
exports.RideModule = RideModule;
exports.RideModule = RideModule = __decorate([
    (0, common_1.Module)({
        providers: [
            ride_service_1.RideService,
            ride_resolver_1.RideResolver,
            zone_resolver_1.ZoneResolver,
            prisma_service_1.PrismaService,
            rabbitmq_service_1.RabbitMQService,
        ],
    })
], RideModule);
//# sourceMappingURL=ride.module.js.map