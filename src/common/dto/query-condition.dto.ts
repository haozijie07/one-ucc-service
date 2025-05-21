import {
  IsOptional,
  IsString,
  IsIn,
  ValidateNested,
  IsArray,
  IsInt,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class Condition {
  @ApiProperty({ description: '字段名' })
  @IsString()
  field: string;

  @ApiProperty({
    description: '操作符',
    enum: ['eq', 'ne', 'lt', 'lte', 'gt', 'gte', 'like', 'in', 'between'],
  })
  @IsIn(['eq', 'ne', 'lt', 'lte', 'gt', 'gte', 'like', 'in', 'between'])
  operator:
    | 'eq'
    | 'ne'
    | 'lt'
    | 'lte'
    | 'gt'
    | 'gte'
    | 'like'
    | 'in'
    | 'between';

  @ApiPropertyOptional({ description: '值' })
  @IsOptional()
  value: any;
}

export class QueryDto {
  @IsInt()
  @ApiProperty({ description: '当前页码', required: true, example: 1 })
  pageIndex: number = 1;

  @IsInt()
  @ApiProperty({ description: '每页条数', required: true, example: 20 })
  pageSize: number = 20;

  @ApiPropertyOptional({
    description: '过滤条件',
    type: [Condition],
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Condition)
  conditions?: Condition[];

  @IsOptional()
  @IsString()
  @ApiProperty({ description: '排序字段' })
  sortBy?: string;

  @ApiPropertyOptional({
    description: '排序顺序',
    enum: ['asc', 'desc'],
  })
  @IsOptional()
  @IsIn(['asc', 'desc'])
  sortOrder?: 'asc' | 'desc';
}
