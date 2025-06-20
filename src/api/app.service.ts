import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpStatus, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AllExceptionsFilter } from 'src/infrostructure/exceoption/all.Error.filter';

const Port = Number( process.env.PORT) || 3000;
export default class Application {
  public static async main(): Promise<void> {
    let app = await NestFactory.create(AppModule);
    app.useGlobalFilters(new AllExceptionsFilter());
    app.enableCors({
      origin: '*',
    });
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      }),
    );
    const api = 'api';
    app.setGlobalPrefix(api);
    const config_swwager = new DocumentBuilder()
      .setTitle('Barber Shop')
      .setVersion('1.0')
      .addBearerAuth({
        type: 'http',
        scheme: 'Bearer',
        in: 'Header',
      })
      .build();
    const documentFactory = () =>
      SwaggerModule.createDocument(app, config_swwager);
    SwaggerModule.setup(api, app, documentFactory);
    await app.listen(Port, () => {
      console.log(`server running on port ${Port}`);
    });
  }
}
