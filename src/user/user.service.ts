import { Injectable } from '@nestjs/common';
import { beams, channel } from '../config';

@Injectable()
export class UserService {
  mainBalanceChange(payload: any) {
    const driverId = payload.driverId;
    const mainBalance = payload.mainBalance;
    if (!driverId) return;
    const data = {
      mainBalance,
    };
    channel.pusher.trigger(driverId, 'balance-changed', data);
  }
}
