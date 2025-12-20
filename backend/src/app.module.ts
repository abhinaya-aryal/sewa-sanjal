import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { PrismaModule } from "./prisma/prisma.module";
import { ProvidersModule } from "./providers/providers.module";
import { UsersModule } from "./users/users.module";
import { CategoriesModule } from './categories/categories.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PrismaModule,
    UsersModule,
    AuthModule,
    ProvidersModule,
    CategoriesModule,
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
