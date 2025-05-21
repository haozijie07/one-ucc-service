import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// 替代 __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
/**
 *
 * @param {string} modelName
 */
function generateBasicNestFile(modelName) {
  const filePrefix = modelName.toLowerCase();

  const moduleDir = path.join(__dirname, `../modules/${filePrefix}`);
  const moduleBackDir = path.join(__dirname, `../modules/${filePrefix}/back`);

  fs.mkdirSync(moduleDir, { recursive: true });

  const className =
    modelName.charAt(0).toUpperCase() + modelName.slice(1, modelName.length);

  const files = [
    {
      filename: `service.ts`,
      content: `
        import { Injectable } from '@nestjs/common';
        import { Create${className}Dto } from './dto/create.dto';
        import { Update${className}Dto } from './dto/update.dto';
        import prisma from 'src/prisma';

        @Injectable()
        export class ${className}Service {
          async create(data: Create${className}Dto) {
            return prisma.${filePrefix}.create({
              data
            })
          }
          
          async findAll() {
            return prisma.${filePrefix}.findMany({
              where: { deletedAt: null },
            })
          }

          async findById(id: string) {
            return prisma.${filePrefix}.findUnique({
              where: { id, deletedAt: null }
            })
          }

          async update(id: string, data: Update${className}Dto) {
            return prisma.${filePrefix}.update({
              where: { id, deletedAt: null },
              data
            })
          }
          
          async delete(id:string) {
            return prisma.${filePrefix}.update({
              where: { id, deletedAt: null },
              data: { deletedAt: new Date() },
            })
          }
        }

        export default ${className}Service;
      `,
    },
    {
      filename: `controller.ts`,
      content: `
        import { Body, Controller, Get, Param, Post, Patch, Delete } from '@nestjs/common';
        import {
          ApiTags,
          ApiOperation,
          ApiParam,
          ApiResponse,
          ApiExtraModels,
          getSchemaPath,
        } from '@nestjs/swagger';
        import { ${className}Service } from './service';
        import { Create${className}Dto } from './dto/create.dto';
        import { Update${className}Dto } from './dto/update.dto';
        import { CommonResponse } from 'src/common/dto/common-response.dto';

        @ApiTags('${filePrefix}')
        @ApiExtraModels(CommonResponse, Update${className}Dto)
        @Controller('${filePrefix}')
        export class ${className}Controller {

          constructor(private service: ${className}Service){}

          @Post()
          @ApiOperation({ summary: '新增 ${filePrefix}' })
          @ApiResponse({
            description: '返回新增 ${filePrefix}',
            schema: {
              allOf: [
                { $ref: getSchemaPath(CommonResponse) },
                {
                  properties: {
                    data: {
                      $ref: getSchemaPath(Update${className}Dto),
                    },
                  },
                },
              ],
            },
          })
          async create(@Body() data: Create${className}Dto) {
            return this.service.create(data)
          }

          @Get()
          @ApiOperation({ summary: '获取所有 ${filePrefix}' })
          @ApiResponse({
            description: '返回所有 ${filePrefix}',
            
            schema: {
              allOf: [
                { $ref: getSchemaPath(CommonResponse) },
                {
                  type: 'object',
                  properties: {
                    data: {
                      type: 'array',
                      items: { $ref: getSchemaPath(Update${className}Dto) },
                    },
                  },
                },
              ],
            },
          })
          async findAll() {
            return this.service.findAll()
          }

          @Get(':id')
          @ApiOperation({ summary: '根据 id 获取 ${className} 详情' })
          @ApiParam({ name: 'id', description: 'id' })
          @ApiResponse({
            description: '返回 ${filePrefix} 详情',
            schema: {
              allOf: [
                { $ref: getSchemaPath(CommonResponse) },
                {
                  properties: {
                    data: {
                      $ref: getSchemaPath(Update${className}Dto),
                    },
                  },
                },
              ],
            },
          })
          async findById(@Param('id') id:string) {
            return this.service.findById(id)
          }

          @Patch(':id')
          @ApiOperation({ summary: '修改 ${filePrefix}' })
          @ApiResponse({
            description: '返回修改的 ${filePrefix}',
            schema: {
              allOf: [
                { $ref: getSchemaPath(CommonResponse) },
                {
                  properties: {
                    data: {
                      $ref: getSchemaPath(Update${className}Dto),
                    },
                  },
                },
              ],
            },
          })
          async update(@Param('id') id:string, @Body() data: Update${className}Dto) {
            return this.service.update(id, data)
          }

          @Delete(':id')
          @ApiOperation({ summary: '根据 ID 删除 ${filePrefix}' })
          @ApiResponse({
            description: '返回删除的 ${filePrefix}',
            schema: {
              allOf: [
                { $ref: getSchemaPath(CommonResponse) },
                {
                  properties: {
                    data: {
                      $ref: getSchemaPath(Update${className}Dto),
                    },
                  },
                },
              ],
            },
          })
          async delete(@Param('id') id:string) {
            return this.service.delete(id)
          }
        }

        export default ${className}Controller;
      `,
    },
    {
      filename: `module.ts`,
      content: `
        import { Module } from '@nestjs/common';
        import { ${className}Service } from './service';
        import { ${className}Controller } from './controller';

        @Module({
          controllers: [${className}Controller],
          providers: [${className}Service],
        })

        export class ${className}Module {}
      `,
    },
  ];

  for (let i = 0; i < files.length; i++) {
    const filename = files[i].filename;
    const content = files[i].content;

    const filePath = path.join(moduleDir, filename);
    const backFilePath = path.join(moduleBackDir, filename);

    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, content);
      console.log(`✅ 已生成: ${filePath}`);
    } else {
      fs.writeFileSync(backFilePath, content);
      console.log(`⚠️ 已存在（生成备份）: ${backFilePath}`);
    }
  }
}

export default generateBasicNestFile;
