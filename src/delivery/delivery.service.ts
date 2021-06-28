import { Injectable } from '@nestjs/common';
import { beams, channel } from '../config';
import { EDeliverEvent, OrderLocationUpdateEventPayload } from './interfaces';

@Injectable()
export class DeliveryService {
  dispatchDriver(payload: any) {
    const orderId = payload.orderId;
    const driverId = payload.driverId;
    const estimatedArrivalTime = payload?.estimatedArrivalTime;
    const totalDistance = payload?.totalDistance;
    if (!driverId || !orderId) return;
    const data: any = {
      orderId,
      estimatedArrivalTime,
      totalDistance,
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
    const orderId = payload.orderId;
    const driverId = payload.driverId;
    if (!driverId || !orderId) return;
    const saleChannel = `order_${orderId}`;

    // console.log(event.toString, saleChannel, posChannel);
    // channel.pusher.trigger(saleChannel, 'order-status', { order });
    switch (event) {
      //   case (EOrderEvent.restaurantAccepted, EOrderEvent.driverCompleted):
      //     // TODO: Handle event
      //     channel.pusher.trigger(posChannel, 'order-status', { order });
      //     channel.pusher.trigger(saleChannel, 'order-status', payload);
      //     break;
      //   case (EOrderEvent.driverAccepted, EOrderEvent.driverPickedUp):
      //     // TODO: Handle event
      //     channel.pusher.trigger(saleChannel, 'order-status', payload);
      //     break;
      case EDeliverEvent.driverMoving:
        const {
          latitude,
          longitude,
        } = payload as OrderLocationUpdateEventPayload;
        if (latitude && longitude) {
          const data = { latitude, longitude };
          channel.pusher.trigger(saleChannel, 'delivery-location', data);
        }
        break;
    }

    return 'Notification Order Hello World!';
  }
}
