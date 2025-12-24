import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { AppController } from "./app.controller";
import { AuthModule } from "./auth/auth.module";
import { CategoriesModule } from "./categories/categories.module";
import { PrismaModule } from "./prisma/prisma.module";
import { ProvidersModule } from "./providers/providers.module";
import { ServicesModule } from "./services/services.module";
import { UsersModule } from "./users/users.module";
import { AvailabilitiesModule } from './availabilities/availabilities.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PrismaModule,
    UsersModule,
    AuthModule,
    ProvidersModule,
    CategoriesModule,
    ServicesModule,
    AvailabilitiesModule,
  ],

  controllers: [AppController],
})
export class AppModule {}
