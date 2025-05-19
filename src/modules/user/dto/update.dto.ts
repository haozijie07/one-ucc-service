import { IsString, IsOptional, IsIn, IsBoolean, IsDate, IsInt } from 'class-validator';
  import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @IsString()
  @ApiProperty({ description: 'id' })
  id: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ description: '用户名' })
  username?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ description: '密码' })
  password?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ description: '姓名' })
  name?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ description: '头像' })
  avatar?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ description: '邮箱' })
  email?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ description: '手机号' })
  mobile?: string;

  @IsOptional()
  @IsIn(['男', '女', '其他'])
  @ApiProperty({ description: '性别' })
  sex?: '男' | '女' | '其他';

  @IsOptional()
  @IsString()
  @ApiProperty({ description: '地址' })
  address?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ description: '籍贯' })
  nativeAddress?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ description: '身份证号码' })
  idCard?: string;

  @IsOptional()
  @IsBoolean()
  @ApiProperty({ description: '是否启用' })
  isEnable?: boolean;

  @IsOptional()
  @IsDate()
  @ApiProperty({ description: '最后登录时间' })
  lastLoginAt?: Date;

  @IsOptional()
  @IsInt()
  @ApiProperty({ description: '登录失败次数' })
  loginFailCount?: number;

  @IsOptional()
  @IsDate()
  @ApiProperty({ description: '登录锁定时间' })
  loginLockedUnitl?: Date;

  @IsOptional()
  @IsDate()
  @ApiProperty({ description: '入职时间' })
  joinTime?: Date;

  @IsOptional()
  @IsDate()
  @ApiProperty({ description: '离职时间' })
  leaveTime?: Date;

  @IsOptional()
  @IsString()
  @ApiProperty({ description: '职位' })
  position?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ description: '部门' })
  department?: string;

  @IsOptional()
  @IsDate()
  @ApiProperty({ description: '' })
  createdAt?: Date;

  @IsOptional()
  @IsString()
  @ApiProperty({ description: '' })
  createdBy?: string;

  @IsOptional()
  @IsDate()
  @ApiProperty({ description: '' })
  updatedAt?: Date;

  @IsOptional()
  @IsString()
  @ApiProperty({ description: '' })
  updatedBy?: string;

  @IsOptional()
  @IsDate()
  @ApiProperty({ description: '' })
  deletedAt?: Date;

  @IsOptional()
  @IsString()
  @ApiProperty({ description: '' })
  deletedBy?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ description: '' })
  remark?: string;

}
