import {
  Catch,
  ExceptionFilter,
  ArgumentsHost,
  HttpStatus,
} from "@nestjs/common";
import { Response } from "express";
import { Prisma } from "prisma/generated/client";

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaExceptionFilter implements ExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const response: Response = host.switchToHttp().getResponse();

    if (exception.code === "P2002") {
      const fields = (exception.meta?.target as string[]) || [];

      return response.status(HttpStatus.CONFLICT).json({
        statusCode: HttpStatus.CONFLICT,
        message: "Duplicate value detected",
        errors: fields.map((field) => ({
          field,
          message: `${field} already exists`,
        })),
      });
    }

    return response.status(HttpStatus.BAD_REQUEST).json({
      statusCode: HttpStatus.BAD_REQUEST,
      message: "Database error",
    });
  }
}
