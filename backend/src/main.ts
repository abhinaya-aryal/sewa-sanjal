import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  const swaggerConfig = new DocumentBuilder()
    .setTitle("Sewa-Sansar")
    .setDescription("The Sewa-Sansar API description")
    .setVersion("1.0")
    .build();

  const documentFactory = () =>
    SwaggerModule.createDocument(app, swaggerConfig);

  SwaggerModule.setup("docs", app, documentFactory, {
    customSiteTitle: "API Docs - SewaFlow",
  });

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap().catch(() => {
  console.error("Error starting the application");
});
