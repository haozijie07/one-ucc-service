
        import { Body, Controller, Get, Param, Post, Patch, Delete } from '@nestjs/common';
        import { UserService } from './service';
        import { CreateUserDto } from './dto/create.dto';
        import { UpdateUserDto } from './dto/update.dto';

        @Controller('user')
        export class UserController {

          constructor(private service: UserService){}

          @Post()
          async create(@Body() data: CreateUserDto) {
            return this.service.create(data)
          }

          @Get()
          async findAll() {
            return this.service.findAll()
          }

          @Get(':id')
          async findById(@Param('id') id:string) {
            return this.service.findById(id)
          }

          @Patch(':id')
          async update(@Param('id') id:string, @Body() data: UpdateUserDto) {
            return this.service.update(id, data)
          }

          @Delete(':id')
          async delete(@Param('id') id:string) {
            return this.service.delete(id)
          }
        }

        export default UserController;
      