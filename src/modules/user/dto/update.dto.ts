import {
  IsString,
  IsOptional,
  IsIn,
  IsBoolean,
  IsDate,
  IsInt,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @IsString()
  @ApiProperty({ description: 'id', required: true })
  id: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ description: '用户名', required: false })
  username?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ description: '密码', required: false })
  password?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ description: '姓名', required: false })
  name?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ description: '头像', required: false })
  avatar?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ description: '邮箱', required: false })
  email?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ description: '手机号', required: false })
  mobile?: string;

  @IsOptional()
  @IsIn(['男', '女', '其他'])
  @ApiProperty({ description: '性别', required: false })
  sex?: '男' | '女' | '其他';

  @IsOptional()
  @IsString()
  @ApiProperty({ description: '地址', required: false })
  address?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ description: '籍贯', required: false })
  nativeAddress?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ description: '身份证号码', required: false })
  idCard?: string;

  @IsOptional()
  @IsBoolean()
  @ApiProperty({ description: '是否启用', required: false })
  isEnable?: boolean;

  @IsOptional()
  @IsDate()
  @ApiProperty({ description: '最后登录时间', required: false })
  lastLoginAt?: Date;

  @IsOptional()
  @IsInt()
  @ApiProperty({ description: '登录失败次数', required: false })
  loginFailCount?: number;

  @IsOptional()
  @IsDate()
  @ApiProperty({ description: '登录锁定时间', required: false })
  loginLockedUnitl?: Date;

  @IsOptional()
  @IsDate()
  @ApiProperty({ description: '入职时间', required: false })
  joinTime?: Date;

  @IsOptional()
  @IsDate()
  @ApiProperty({ description: '离职时间', required: false })
  leaveTime?: Date;

  @IsOptional()
  @IsString()
  @ApiProperty({ description: '职位', required: false })
  position?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ description: '部门', required: false })
  department?: string;

  @IsOptional()
  @IsDate()
  @ApiProperty({ description: '', required: false })
  createdAt?: Date;

  @IsOptional()
  @IsString()
  @ApiProperty({ description: '', required: false })
  createdBy?: string;

  @IsOptional()
  @IsDate()
  @ApiProperty({ description: '', required: false })
  updatedAt?: Date;

  @IsOptional()
  @IsString()
  @ApiProperty({ description: '', required: false })
  updatedBy?: string;

  @IsOptional()
  @IsDate()
  @ApiProperty({ description: '', required: false })
  deletedAt?: Date;

  @IsOptional()
  @IsString()
  @ApiProperty({ description: '', required: false })
  deletedBy?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ description: '', required: false })
  remark?: string;
}
