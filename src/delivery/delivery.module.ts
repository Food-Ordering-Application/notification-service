import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DeliveryController } from './delivery.controller';
import { DeliveryService } from './delivery.service';
@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [DeliveryController],
  providers: [DeliveryService],
  exports: [DeliveryService],
})
export class DeliveryModule {}
