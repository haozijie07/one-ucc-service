import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import bcrypt from 'bcryptjs';
import prisma from 'src/prisma';

@Injectable()
export class UserService {
  async create(dto: CreateUserDto) {
    const hashed = await bcrypt.hash(dto.password, 10);

    return prisma.user.create({
      data: {
        username: dto.username,
        password: hashed,
        name: dto.name,
        remark: dto.remark,
      },
    });
  }

  async findAll() {
    return prisma.user.findMany({
      where: { deletedAt: null },
      include: { roles: true },
    });
  }

  async findById(id: string) {
    return prisma.user.findUnique({ where: { id } });
  }
}
