import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  // app.useGlobalFilters(new PrismaExceptionFilter());  // not working as expected

  const swaggerConfig = new DocumentBuilder()
    .setTitle("Sewa-Sanjal")
    .setDescription("The Sewa-Sanjal API description")
    .setVersion("1.0")
    .addBearerAuth(
      {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
        name: "Authorization",
        in: "header",
      },
      "access-token",
    )
    .addTag("App")
    .addTag("Auth")
    .build();

  const documentFactory = () =>
    SwaggerModule.createDocument(app, swaggerConfig);

  SwaggerModule.setup("docs", app, documentFactory, {
    customSiteTitle: "API Docs - Sewa Sanjal",
    swaggerOptions: {
      persistAuthorization:
        process.env.NODE_ENV === "development" ? true : false,
    },
  });

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap().catch(() => {
  console.error("Error starting the application"); // eslint-disable-line
});
