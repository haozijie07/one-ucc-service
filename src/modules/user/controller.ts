import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Patch,
  Delete,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiExtraModels,
} from '@nestjs/swagger';
import { UserService } from './service';
import { CreateUserDto } from './dto/create.dto';
import { UpdateUserDto } from './dto/update.dto';
import { CommonResponse } from 'src/common/dto/common-response.dto';
import {
  ApiOkResponseWithData,
  ApiOkResponseWithArray,
  ApiOkResponseWithPagination,
} from 'src/common/decorators/api-response-with-data.decorator';
import { QueryDto } from 'src/common/dto/query-condition.dto';

@ApiTags('user')
@ApiExtraModels(CommonResponse, UpdateUserDto)
@Controller('user')
export class UserController {
  constructor(private service: UserService) {}

  @Post()
  @ApiOperation({ summary: '新增 user' })
  @ApiOkResponseWithData(UpdateUserDto, '返回新增的 user')
  async create(@Body() data: CreateUserDto) {
    return this.service.create(data);
  }

  @Get()
  @ApiOperation({ summary: '获取所有 user' })
  @ApiOkResponseWithArray(UpdateUserDto, '返回所有 user')
  async findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: '根据 id 获取 User 详情' })
  @ApiParam({ name: 'id', description: 'id' })
  @ApiOkResponseWithData(UpdateUserDto, '返回 user 详情')
  async findById(@Param('id') id: string) {
    return this.service.findById(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: '修改 user' })
  @ApiOkResponseWithData(UpdateUserDto, '返回修改的 user')
  async update(@Param('id') id: string, @Body() data: UpdateUserDto) {
    return this.service.update(id, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: '根据 ID 删除 user' })
  @ApiOkResponseWithData(UpdateUserDto, '返回删除的 user')
  async delete(@Param('id') id: string) {
    return this.service.delete(id);
  }

  @Post('/pageList')
  @ApiOperation({ summary: '分页查询 user' })
  @ApiOkResponseWithPagination(UpdateUserDto, '返回分页查询的 user')
  async pageList(@Body() data: QueryDto) {
    return this.service.pageList(data);
  }
}

export default UserController;
