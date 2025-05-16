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
exports.KafkaService = void 0;
const common_1 = require("@nestjs/common");
const kafkajs_1 = require("kafkajs");
let KafkaService = class KafkaService {
    constructor() {
        this.kafka = new kafkajs_1.Kafka({
            clientId: 'carpool-app',
            brokers: ['localhost:9092'],
        });
    }
    async produceMessage(topic, message) {
        const producer = this.kafka.producer();
        await producer.connect();
        await producer.send({
            topic,
            messages: [
                {
                    value: message,
                },
            ],
        });
        await producer.disconnect();
    }
    async consumeMessage(topic, groupId) {
        const consumer = this.kafka.consumer({ groupId });
        await consumer.connect();
        await consumer.subscribe({ topic });
        await consumer.run({
            eachMessage: async ({ topic, partition, message }) => {
                if (message.value !== null && message.value !== undefined) {
                    console.log(`Received message: ${message.value.toString()}`);
                }
                else {
                    console.log('Received a message with no value');
                }
            },
        });
    }
};
exports.KafkaService = KafkaService;
exports.KafkaService = KafkaService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], KafkaService);
//# sourceMappingURL=kafka.service.js.map