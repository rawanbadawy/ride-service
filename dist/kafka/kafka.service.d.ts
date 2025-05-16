export declare class KafkaService {
    private kafka;
    constructor();
    produceMessage(topic: string, message: string): Promise<void>;
    consumeMessage(topic: string, groupId: string): Promise<void>;
}
