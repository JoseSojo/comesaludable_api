import { Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { EventType } from "src/infrastructure/dto/interfaces/event.interface";

@Injectable()
export default class EventListenerService {
    
    constructor() {}

    @OnEvent(`**`)
    private async handleEventCreate(data: EventType) {}

}
