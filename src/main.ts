import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v2') // método agrega prefijo para la API 
app.useGlobalPipes(
 new ValidationPipe({
 whitelist: true,
 forbidNonWhitelisted: true,
 // configuracion para que los Query parametres se lean en modo number y no en string solucionando el choque de informacion
 // tramsforma la informacion que llega los Dtos a la informacion que este espera para su validacion.
  transform: true,
 transformOptions: {
  enableImplicitConversion: true,
}
//.......................
 })
);

  await app.listen(process.env.PORT);
  console.log(`App running on Port ${process.env.PORT}`)
}
bootstrap();
 