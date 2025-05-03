import { IsString, IsBoolean, IsDate, IsOptional } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  id: string;

  @IsString()
  username: string;

  @IsString()
  password: string;

  @IsString()
  name: string;

  @IsBoolean()
  isEnable: boolean;

  @IsOptional()
  @IsDate()
  createdAt: Date;

  @IsOptional()
  @IsDate()
  updatedAt: Date;

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
