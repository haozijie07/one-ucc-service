// src/common/dto/common-response.dto.ts
import { ApiProperty } from '@nestjs/swagger';

export class CommonResponse<T> {
  @ApiProperty({ example: 200 })
  code: number;

  @ApiProperty({ example: 'success' })
  message: string;

  @ApiProperty()
  data: T;
}
