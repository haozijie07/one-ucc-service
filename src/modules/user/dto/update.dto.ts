import { IsString, IsOptional, IsBoolean, IsDate } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  id: string;

  @IsOptional()

  @IsString()
  username?: string;

  @IsOptional()

  @IsString()
  password?: string;

  @IsOptional()

  @IsString()
  name?: string;

  @IsOptional()

  @IsBoolean()
  isEnable?: boolean;

  @IsOptional()

  @IsDate()
  createdAt?: Date;

  @IsOptional()

  @IsDate()
  updatedAt?: Date;

  @IsOptional()

  @IsDate()
  deletedAt?: Date;

  @IsOptional()

  @IsString()
  createdBy?: string;

  @IsOptional()

  @IsString()
  updatedBy?: string;

  @IsOptional()

  @IsString()
  deleteBy?: string;

  @IsOptional()

  @IsString()
  remark?: string;
}
