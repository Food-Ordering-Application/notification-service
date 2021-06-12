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

    channel.pusher.trigger(interestName, 'new-order', payload);
    return 'Notification Order Hello World!';
  }

  orderProcessing(event: EOrderEvent, payload: any) {
    const restaurantId = payload.restaurantId;
    const orderId = payload.id;
    if (!restaurantId || !orderId) return;
    const posChannel = `orders_${restaurantId}`;
    const saleChannel = `order_${orderId}`;

    // const order = {
    //   id: payload.id,
    //   status: payload.status,
    // };
    const orderDelivery = payload.delivery;
    const order = {
      id: payload.id,
      status: payload.status,
      delivery: {
        id: orderDelivery.id,
        customerId: orderDelivery.customerId,
        distance: orderDelivery.distance,
        shippingFee: orderDelivery.shippingFee,
        status: orderDelivery.status,
        deliveredAt: orderDelivery.deliveredAt,
        expectedDeliveryTime: orderDelivery.expectedDeliveryTime,
      },
    };
    console.log(event, saleChannel, posChannel, order, payload);
    switch (event) {
      case EOrderEvent.restaurantAccepted:
      case EOrderEvent.restaurantReady:
      case EOrderEvent.driverPickedUp:
      case EOrderEvent.driverCompleted: {
        // TODO: Handle event
        // console.log(
        //   `EOrderEvent.restaurantAccepted, EOrderEvent.driverCompleted`,
        //   event,
        // );
        channel.pusher.trigger(posChannel, 'order-status', { order });
        channel.pusher.trigger(saleChannel, 'order-status', payload);
        break;
      }
      case EOrderEvent.driverAccepted: {
        // TODO: Handle event
        // console.log(
        //   `EOrderEvent.driverAccepted, EOrderEvent.driverPickedUp`,
        //   event,
        // );
        channel.pusher.trigger(saleChannel, 'order-status', payload);
        break;
      }
    }
    return 'Notification Order Hello World!';
  }
}
