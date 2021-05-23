import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
// import { AppGateway } from './app.gateway';
// import { OrderGateway } from './.order/order.gateway';
import { OrderModule } from './order/order.module';
import { AlertGateway } from './alert/alert.gateway';
import { AlertController } from './alert/alert.controller';
import { CommentsController } from './comments/comments.controller';
import { CommentService } from './comments/comments.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    OrderModule,
  ],
  controllers: [AlertController, CommentsController],
  providers: [AlertGateway, CommentService],
})
export class AppModule {}
