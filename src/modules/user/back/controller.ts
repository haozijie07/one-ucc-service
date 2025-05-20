
        import { Body, Controller, Get, Param, Post, Patch, Delete } from '@nestjs/common';
        import { ApiTags, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
        import { UserService } from './service';
        import { CreateUserDto } from './dto/create.dto';
        import { UpdateUserDto } from './dto/update.dto';

        @ApiTags('user')
        @Controller('user')
        export class UserController {

          constructor(private service: UserService){}

          @Post()
          @ApiOperation({ summary: '新增 user' })
          @ApiResponse({ status: 200, description: '返回新增 user', type: CreateUserDto, isArray: false })
          async create(@Body() data: CreateUserDto) {
            return this.service.create(data)
          }

          @Get()
          @ApiOperation({ summary: '获取所有 user' })
          @ApiResponse({ status: 200, description: '返回 user 数组', type: CreateUserDto, isArray: true })
          async findAll() {
            return this.service.findAll()
          }

          @Get(':id')
          @ApiOperation({ summary: '根据 id 获取 User 详情' })
          @ApiParam({ name: 'id', description: 'id' })
          @ApiResponse({ status: 200, description: '返回 user 详情', type: CreateUserDto, isArray: false })
          async findById(@Param('id') id:string) {
            return this.service.findById(id)
          }

          @Patch(':id')
          @ApiOperation({ summary: '修改 user' })
          @ApiResponse({ status: 200, description: '返回修改的 user', type: CreateUserDto, isArray: false })
          async update(@Param('id') id:string, @Body() data: UpdateUserDto) {
            return this.service.update(id, data)
          }

          @Delete(':id')
          @ApiOperation({ summary: '根据 ID 删除 user' })
          @ApiResponse({ status: 200, description: '返回删除的 user', type: CreateUserDto, isArray: false })
          async delete(@Param('id') id:string) {
            return this.service.delete(id)
          }
        }

        export default UserController;
      