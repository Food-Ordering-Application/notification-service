import { Module } from '@nestjs/common';
// import { AppGateway } from './app.gateway';
import { OrderGateway } from './order/order.gateway';
import { AlertGateway } from './alert/alert.gateway';
import { AlertController } from './alert/alert.controller';

@Module({
  imports: [],
  controllers: [AlertController],
  providers: [OrderGateway, AlertGateway],
})
export class AppModule {}
