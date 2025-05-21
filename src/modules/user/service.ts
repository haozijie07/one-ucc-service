
        import { Injectable } from '@nestjs/common';
        import { CreateUserDto } from './dto/create.dto';
        import { UpdateUserDto } from './dto/update.dto';
        import prisma from 'src/prisma';
        import { buildWhereInput } from 'src/utils/query-builder';
        import { QueryDto } from 'src/common/dto/query-condition.dto';

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

          async pageList(query: QueryDto) {
            const where = buildWhereInput(query.conditions || []);
            const skip = (query.pageIndex - 1) * query.pageSize;
            const take = query.pageSize;

            const orderBy = query.sortBy
              ? { [query.sortBy]: query.sortOrder ?? 'asc' }
              : undefined;

            const [list, total] = await prisma.$transaction([
              prisma.user.findMany({ where, skip, take, orderBy }),
              prisma.user.count({ where }),
            ]);

            return {
              data: list,
              total,
            };
          }
        }

        export default UserService;
      