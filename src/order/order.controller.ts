import { Controller } from '@nestjs/common';
import { OrderService } from './order.service';
import { EventPattern } from '@nestjs/microservices';
@Controller()
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @EventPattern({ event: 'order_updated' })
  async handleOrderUpdated(data: Record<string, unknown>) {
    console.log('handleOrderUpdated');
    console.log(data);
    this.orderService.getHello();
  }
}
