import { Injectable } from '@nestjs/common';
import { beams, channel } from '../config';
import { EOrderEvent } from './interfaces';

@Injectable()
export class OrderService {
  orderUpdated(payload: any): string {
    const restaurantId = payload.restaurantId;
    const orderId = payload.id;
    if (!restaurantId || !orderId) return;
    const interestName = `orders_${restaurantId}`;
    const data: any = {
      orderId,
    };
    beams.client
      .publishToInterests([interestName], {
        apns: {
          aps: {
            alert: {
              title: 'Đơn hàng mới',
              body: 'Hello, world!',
            },
          },
          data,
        },
        fcm: {
          notification: {
            title: 'Đơn hàng mới',
            body: 'Hello, world!',
          },
          data,
        },
        web: {
          notification: {
            title: 'Đơn hàng mới',
            body: 'Hello, world!',
          },
          data,
        },
      })
      .then((publishResponse) => {
        console.log('Just published:', publishResponse.publishId, interestName);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    return 'Notification Order Hello World!';
  }

  orderProcessing(event: EOrderEvent, payload: any) {
    const restaurantId = payload.restaurantId;
    const orderId = payload.id;
    if (!restaurantId || !orderId) return;
    const saleChannel = `orders_${restaurantId}`;
    const posChannel = `order_${orderId}`;

    const order = {
      id: payload.id,
      status: payload.status,
    };

    console.log(event.toString, saleChannel, posChannel);
    channel.pusher.trigger(saleChannel, 'order-status', { order });
    switch (event) {
      case (EOrderEvent.restaurantAccepted, EOrderEvent.driverCompleted):
        // TODO: Handle event
        channel.pusher.trigger(saleChannel, 'order-status', { order });
        channel.pusher.trigger(posChannel, 'order-status', payload);
        break;
      case (EOrderEvent.driverAccepted, EOrderEvent.driverPickedUp):
        // TODO: Handle event
        channel.pusher.trigger(posChannel, 'order-status', payload);
        break;
    }

    return 'Notification Order Hello World!';
  }
}
