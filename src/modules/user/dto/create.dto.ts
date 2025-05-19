import { IsString, IsOptional, IsIn, IsBoolean, IsDate, IsInt } from 'class-validator';
  import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsOptional()
  @IsString()
  @ApiProperty({ description: 'id' })
  id?: string;

  @IsString()
  @ApiProperty({ description: '用户名' })
  username: string;

  @IsString()
  @ApiProperty({ description: '密码' })
  password: string;

  @IsString()
  @ApiProperty({ description: '姓名' })
  name: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ description: '头像' })
  avatar?: string;

  @IsString()
  @ApiProperty({ description: '邮箱' })
  email: string;

  @IsString()
  @ApiProperty({ description: '手机号' })
  mobile: string;

  @IsIn(['男', '女', '其他'])
  @ApiProperty({ description: '性别' })
  sex: '男' | '女' | '其他';

  @IsString()
  @ApiProperty({ description: '地址' })
  address: string;

  @IsString()
  @ApiProperty({ description: '籍贯' })
  nativeAddress: string;

  @IsString()
  @ApiProperty({ description: '身份证号码' })
  idCard: string;

  @IsBoolean()
  @ApiProperty({ description: '是否启用' })
  isEnable: boolean;

  @IsOptional()
  @IsDate()
  @ApiProperty({ description: '最后登录时间' })
  lastLoginAt?: Date;

  @IsInt()
  @ApiProperty({ description: '登录失败次数' })
  loginFailCount: number;

  @IsOptional()
  @IsDate()
  @ApiProperty({ description: '登录锁定时间' })
  loginLockedUnitl?: Date;

  @IsDate()
  @ApiProperty({ description: '入职时间' })
  joinTime: Date;

  @IsOptional()
  @IsDate()
  @ApiProperty({ description: '离职时间' })
  leaveTime?: Date;

  @IsString()
  @ApiProperty({ description: '职位' })
  position: string;

  @IsString()
  @ApiProperty({ description: '部门' })
  department: string;

  @IsOptional()
  @IsDate()
  @ApiProperty({ description: '' })
  createdAt?: Date;

  @IsString()
  @ApiProperty({ description: '' })
  createdBy: string;

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
