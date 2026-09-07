import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: Number(process.env.PGSQL_PORT),
      username: process.env.PGSQL_USERNAME,
      password: process.env.PGSQL_PASSWORD,
      database: process.env.PGSQL_DB_NAME,
      entities: [import.meta.dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      logging: true,
    }),
  ],  
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
