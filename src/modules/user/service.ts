
        import { Injectable } from '@nestjs/common';
        import { CreateUserDto } from './dto/create.dto';
        import { UpdateUserDto } from './dto/update.dto';
        import prisma from 'src/prisma';

        @Injectable()
        export class UserService {
          async create(data: CreateUserDto) {
            return prisma.user.create({
              data
            })
          }
          
          async findAll() {
            return prisma.user.findMany({
              where: { deletedAt: null },
            })
          }

          async findById(id: string) {
            return prisma.user.findUnique({
              where: { id, deletedAt: null }
            })
          }

          async update(id: string, data: UpdateUserDto) {
            return prisma.user.update({
              where: { id, deletedAt: null },
              data
            })
          }
          
          async delete(id:string) {
            return prisma.user.update({
              where: { id, deletedAt: null },
              data: { deletedAt: new Date() },
            })
          }
        }

        export default UserService;
      