import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { DishesModule } from './dish/dishes.module';
import { AuthModule } from './auth/auth.module';
import { CategoriesModule } from './categories/categories.module';
import { DescriptionModule } from './description/description.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres', // or your database type
      url: 'postgresql://postgres:123456@localhost:5432/menu_db',
      autoLoadEntities: true,
      synchronize: true,
      database: 'menu_db',
    }),
    AuthModule,
    UsersModule,
    DishesModule,
    CategoriesModule,
    DescriptionModule
  ],
})
export class AppModule {}
