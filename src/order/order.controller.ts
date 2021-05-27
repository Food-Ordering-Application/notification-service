import { Controller } from '@nestjs/common';
import { OrderService } from './order.service';
import { EOrderEvent } from './interfaces';
import { EventPattern } from '@nestjs/microservices';
@Controller()
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @EventPattern('orderPlacedEvent')
  async handleOrderPlacedEvent(data: Record<string, unknown>) {
    console.log('orderPlacedEvent');
    this.orderService.orderUpdated(data);
  }
  @EventPattern('orderConfirmedByRestaurantEvent')
  async handleOrderConfirmedByRestaurantEvent(data: Record<string, unknown>) {
    console.log('orderConfirmedByRestaurantEvent');
    this.orderService.orderProcessing(EOrderEvent.restaurantAccepted, data);
  }
  @EventPattern('orderHasBeenAssignedToDriverEvent')
  async handleOrderHasBeenAssignedToDriverEvent(data: Record<string, unknown>) {
    console.log('orderHasBeenAssignedToDriverEvent');
    this.orderService.orderProcessing(EOrderEvent.driverAccepted, data);
  }
  @EventPattern('orderHasBeenPickedUpEvent')
  async handleOrderHasBeenPickedUpEvent(data: Record<string, unknown>) {
    console.log('orderHasBeenPickedUpEvent');
    this.orderService.orderProcessing(EOrderEvent.driverPickedUp, data);
  }
  @EventPattern('orderHasBeenCompletedEvent')
  async handleOrderHasBeenCompletedEvent(data: Record<string, unknown>) {
    console.log('orderHasBeenCompletedEvent');
    this.orderService.orderProcessing(EOrderEvent.driverCompleted, data);
  }
}
