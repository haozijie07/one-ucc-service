import { IsString, IsOptional, IsIn, IsBoolean, IsDate, IsInt } from 'class-validator';
  import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsString()
  @ApiProperty({ description: '用户名', required: true })
  username: string;

  @IsString()
  @ApiProperty({ description: '密码', required: true })
  password: string;

  @IsString()
  @ApiProperty({ description: '姓名', required: true })
  name: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ description: '头像', required: false })
  avatar?: string;

  @IsString()
  @ApiProperty({ description: '邮箱', required: true })
  email: string;

  @IsString()
  @ApiProperty({ description: '手机号', required: true })
  mobile: string;

  @IsIn(['男', '女', '其他'])
  @ApiProperty({ description: '性别', required: true })
  sex: '男' | '女' | '其他';

  @IsString()
  @ApiProperty({ description: '地址', required: true })
  address: string;

  @IsString()
  @ApiProperty({ description: '籍贯', required: true })
  nativeAddress: string;

  @IsString()
  @ApiProperty({ description: '身份证号码', required: true })
  idCard: string;

  @IsBoolean()
  @ApiProperty({ description: '是否启用', required: true })
  isEnable: boolean;

  @IsOptional()
  @IsDate()
  @ApiProperty({ description: '最后登录时间', required: false })
  lastLoginAt?: Date;

  @IsInt()
  @ApiProperty({ description: '登录失败次数', required: true })
  loginFailCount: number;

  @IsOptional()
  @IsDate()
  @ApiProperty({ description: '登录锁定时间', required: false })
  loginLockedUnitl?: Date;

  @IsDate()
  @ApiProperty({ description: '入职时间', required: true })
  joinTime: Date;

  @IsOptional()
  @IsDate()
  @ApiProperty({ description: '离职时间', required: false })
  leaveTime?: Date;

  @IsString()
  @ApiProperty({ description: '职位', required: true })
  position: string;

  @IsString()
  @ApiProperty({ description: '部门', required: true })
  department: string;

  @IsOptional()
  @IsDate()
  @ApiProperty({ description: '', required: false })
  createdAt?: Date;

  @IsString()
  @ApiProperty({ description: '', required: true })
  createdBy: string;

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
