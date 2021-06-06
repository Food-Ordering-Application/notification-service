import { Injectable } from '@nestjs/common';
import { beams, channel } from '../config';
import { EDeliverEvent } from './interfaces';

@Injectable()
export class DeliveryService {
  dispatchDriver(payload: any) {
    const orderId = payload.orderId;
    const driverId = payload.driverId;
    if (!driverId || !orderId) return;
    const data: any = {
      orderId,
    };
    beams.client
      .publishToInterests([driverId], {
        apns: {
          aps: {
            alert: {
              title: 'Đơn hàng mới',
              body: 'Đơn hàng chỉ tồn tại trong 15s.',
            },
          },
          data,
        },
        fcm: {
          notification: {
            title: 'Đơn hàng mới',
            body: 'Đơn hàng chỉ tồn tại trong 15s.',
          },
          data,
        },
        web: {
          notification: {
            title: 'Đơn hàng mới',
            body: 'Đơn hàng chỉ tồn tại trong 15s.',
          },
          data,
        },
      })
      .then((publishResponse) => {
        console.log('Driver published:', publishResponse.publishId, driverId);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }
  deliveryProcessing(event: EDeliverEvent, payload: any) {
    const restaurantId = payload.restaurantId;
    const orderId = payload.id;
    if (!restaurantId || !orderId) return;
    const posChannel = `orders_${restaurantId}`;
    const saleChannel = `order_${orderId}`;

    const order = {
      id: payload.id,
      status: payload.status,
    };

    // console.log(event.toString, saleChannel, posChannel);
    // channel.pusher.trigger(saleChannel, 'order-status', { order });
    switch (
      event
      //   case (EOrderEvent.restaurantAccepted, EOrderEvent.driverCompleted):
      //     // TODO: Handle event
      //     channel.pusher.trigger(posChannel, 'order-status', { order });
      //     channel.pusher.trigger(saleChannel, 'order-status', payload);
      //     break;
      //   case (EOrderEvent.driverAccepted, EOrderEvent.driverPickedUp):
      //     // TODO: Handle event
      //     channel.pusher.trigger(saleChannel, 'order-status', payload);
      //     break;
    ) {
    }

    return 'Notification Order Hello World!';
  }
}
