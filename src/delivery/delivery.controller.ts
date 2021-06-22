import { Controller } from '@nestjs/common';
import { DeliveryService } from './delivery.service';
import { EDeliverEvent } from './interfaces';
import { EventPattern } from '@nestjs/microservices';
@Controller()
export class DeliveryController {
  constructor(private readonly deliveryService: DeliveryService) {}

  @EventPattern('dispatchDriverEvent')
  async handleDispatchDriverEvent(data: Record<string, unknown>) {
    console.log('dispatchDriverEvent');
    this.deliveryService.dispatchDriver(data);
  }

  @EventPattern('deliveryLocationUpdateEvent')
  async handleDeliveryLocationUpdateEvent(data: Record<string, unknown>) {
    console.log('deliveryLocationUpdateEvent');
    this.deliveryService.deliveryProcessing(EDeliverEvent.driverMoving, data);
  }
}
