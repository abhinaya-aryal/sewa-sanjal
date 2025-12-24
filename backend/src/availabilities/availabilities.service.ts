import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

import {
  CreateAvailabilityDto,
  UpdateAvailabilityDto,
} from "./availabilities.dto";

@Injectable()
export class AvailabilitiesService {
  constructor(private prisma: PrismaService) {}

  async create(providerId: string, data: CreateAvailabilityDto) {
    return await this.prisma.availability.create({
      data: {
        ...data,
        providerId,
      },
    });
  }

  async findByProvider(providerId: string) {
    return await this.prisma.availability.findMany({
      where: { providerId },
      orderBy: [{ dayOfWeek: "asc" }, { startTime: "asc" }],
    });
  }

  async update(id: string, providerId: string, data: UpdateAvailabilityDto) {
    const availability = await this.prisma.availability.findUnique({
      where: { id },
    });

    if (!availability) {
      throw new NotFoundException("Availability not found");
    }

    if (availability.providerId !== providerId) {
      throw new ForbiddenException("You cannot modify this availability");
    }

    return await this.prisma.availability.update({ where: { id }, data });
  }

  async remove(id: string, providerId: string) {
    const availability = await this.prisma.availability.findUnique({
      where: { id },
    });

    if (!availability) {
      throw new NotFoundException("Availability not found");
    }

    if (availability.providerId !== providerId) {
      throw new ForbiddenException("You cannot delete this availability");
    }

    return await this.prisma.availability.delete({ where: { id } });
  }
}
