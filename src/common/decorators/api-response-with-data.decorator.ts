import { applyDecorators, Type } from '@nestjs/common';
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from '@nestjs/swagger';
import { CommonResponse } from '../dto/common-response.dto';

export const ApiOkResponseWithData = <TModel extends Type<any>>(
  model: TModel,
  description = '成功响应',
) => {
  return applyDecorators(
    ApiExtraModels(CommonResponse, model),
    ApiOkResponse({
      description,
      schema: {
        allOf: [
          { $ref: getSchemaPath(CommonResponse) },
          {
            type: 'object',
            properties: {
              data: { $ref: getSchemaPath(model) },
            },
          },
        ],
      },
    }),
  );
};

export const ApiOkResponseWithArray = <TModel extends Type<any>>(
  model: TModel,
  description = '成功响应（数组）',
) => {
  return applyDecorators(
    ApiExtraModels(CommonResponse, model),
    ApiOkResponse({
      description,
      schema: {
        allOf: [
          { $ref: getSchemaPath(CommonResponse) },
          {
            type: 'object',
            properties: {
              data: {
                type: 'array',
                items: { $ref: getSchemaPath(model) },
              },
            },
          },
        ],
      },
    }),
  );
};
