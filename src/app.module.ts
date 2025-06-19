import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BarberShopModule } from './barber-shop/barber-shop.module';
import { RatingModule } from './rating/rating.module';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.PG_HOST,
      username: String(process.env.PG_USER),
      port: Number(process.env.PG_PORT),
      password: String(process.env.PG_PASS),
      database: process.env.PG_DB,
      autoLoadEntities: true,
      synchronize: true,
      entities: [],
    }),
    BarberShopModule,
    RatingModule,
  ],
})
export class AppModule {}
