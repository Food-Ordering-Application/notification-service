import { Injectable } from '@nestjs/common';
import { beamsClient } from '../config/pusher';
@Injectable()
export class OrderService {
  orderUpdated(payload: any): string {
    const restaurantId = payload.restaurantId;
    if (!restaurantId) return;
    const interestName = `orders_${restaurantId}`;
    beamsClient
      .publishToInterests([interestName], {
        apns: {
          aps: {
            alert: {
              title: 'Đơn hàng mới',
              body: 'Hello, world!',
            },
          },
        },
        fcm: {
          notification: {
            title: 'Đơn hàng mới',
            body: 'Hello, world!',
          },
        },
        web: {
          notification: {
            title: 'Đơn hàng mới',
            body: 'Hello, world!',
          },
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
}
