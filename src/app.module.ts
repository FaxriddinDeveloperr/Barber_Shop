import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { BarberModule } from './barber/barber.module';
import { BookingModule } from './booking/booking.module';
import { UserEntity } from './user/entities/user.entity';
import { BookingEntity } from './booking/entities/booking.entity';
import { BarberShopModule } from './barber-shop/barber-shop.module';
import { BarberShopEntity } from './barber-shop/entities/barber-shop.entity';
import { ServiceModule } from './service/service.module';

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
      entities: [UserEntity, BookingEntity,BarberShopEntity],
    }),
    UserModule,
    BarberModule,
    BookingModule,
    BarberShopModule,
    ServiceModule,
  ],
})
export class AppModule {}
