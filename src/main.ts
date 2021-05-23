import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [process.env.AMQP_URL],
        queue: process.env.NOTIFICATION_AMQP_QUEUE,
        queueOptions: {
          durable: false,
        },
      },
    },
  );
  app.listen(() => console.log('Notification microservice is listening'));
}
bootstrap();
// async function bootstrap() {
//   const app = await NestFactory.create<NestExpressApplication>(AppModule);
//   app.useStaticAssets(join(__dirname, '..', 'static'));
//   const configService = app.get(ConfigService);
//   const port = configService.get('PORT');

//   await app.listen(port);
// }
// bootstrap();
