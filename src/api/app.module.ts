import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { BarberModule } from './barber/barber.module';
import { BookingModule } from './booking/booking.module';
import { BarberShopModule } from './barber-shop/barber-shop.module';
import { ServiceModule } from './service/service.module';
import { AdminModule } from './admin/admin.module';

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
      entities: [__dirname + `/**/*.entity{.ts,.js}`],
    }),
    UserModule,
    BarberModule,
    BookingModule,
    BarberShopModule,
    ServiceModule,
    AdminModule,
  ],
})
export class AppModule {}
