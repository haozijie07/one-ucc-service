import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import generateBasicNestFile from './generate-basic-file.mjs';

// 替代 __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Prisma 类型映射到 class-validator 装饰器
const typeMapValidator = {
  String: 'IsString',
  Int: 'IsInt',
  Boolean: 'IsBoolean',
  DateTime: 'IsDate',
  Float: 'IsNumber',
};

// Prisma 类型映射到 TS 类型
const typeMapTs = {
  String: 'string',
  Int: 'number',
  Boolean: 'boolean',
  DateTime: 'Date',
  Float: 'number',
};

// 可选字段（通常由系统生成）
const defaultOptionalFields = ['id', 'createdAt', 'updatedAt', 'deletedAt'];

/**
 * 提取 Prisma 模型信息
 */
function parseModels(schema) {
  const models = schema.split('model ').slice(1);

  return models.map((block) => {
    const [header, bodyRaw] = block.split('{');
    const modelName = header.trim();
    const body = bodyRaw.split('}')[0];

    const fields = body
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => {
        const [name, typeRaw] = line.split(/\s+/);
        if (name.startsWith('@') || !typeRaw || typeRaw.includes('[]'))
          return null;

        const type = typeRaw.replace('?', '');
        const isOptional = typeRaw.endsWith('?');
        return { name, type, isOptional };
      })
      .filter(Boolean);

    return { modelName, fields };
  });
}

/**
 * 生成 DTO 文件内容
 */
function generateDtoContent(modelName, fields, type = 'create') {
  const imports = new Set();
  const lines = [];

  fields.forEach((field) => {
    const decorator = typeMapValidator[field.type] || 'IsString';
    const isOptional =
      field.isOptional ||
      (type === 'create' && defaultOptionalFields.includes(field.name)) ||
      (type === 'update' && field.name !== 'id'); // update 默认都 optional，除了 id 可保留必填

    imports.add(decorator);
    if (isOptional) {
      imports.add('IsOptional');
      lines.push(`  @IsOptional()`);
    }

    lines.push(
      `  @${decorator}()\n  ${field.name}${isOptional ? '?' : ''}: ${
        typeMapTs[field.type]
      };`,
    );
  });

  return `import { ${Array.from(imports).join(', ')} } from 'class-validator';

export class ${type === 'create' ? 'Create' : 'Update'}${modelName}Dto {
${lines.join('\n\n')}
}
`;
}

/**
 * 写入文件
 */
function writeDtoFile(modelName, type, content) {
  const baseDir = path.join(__dirname, `../modules/${modelName.toLowerCase()}`);
  const dtoDir = path.join(baseDir, 'dto');

  try {
    // 递归创建文件夹
    fs.mkdirSync(dtoDir, { recursive: true });

    const fileName = `${type}.dto.ts`;
    const filePath = path.join(dtoDir, fileName);
    const backFilePath = path.join(dtoDir, 'back-' + fileName);

    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, content);
      console.log(`✅ 已生成: ${filePath}`);
    } else {
      fs.writeFileSync(backFilePath, content);
      console.log(`⚠️ 已存在（生成备份）: ${backFilePath}`);
    }
  } catch (err) {
    console.error(`❌ 生成 ${modelName} 的 ${type} DTO 失败:`, err);
  }
}
/**
 * 主执行函数
 */
function run(targetModelName) {
  const schemaPath = path.join(__dirname, '../../prisma/schema.prisma');
  const schema = fs.readFileSync(schemaPath, 'utf-8');
  const models = parseModels(schema);

  models.forEach(({ modelName, fields }) => {
    if (targetModelName && modelName !== targetModelName) return;

    const createDto = generateDtoContent(modelName, fields, 'create');
    const updateDto = generateDtoContent(modelName, fields, 'update');

    writeDtoFile(modelName, 'create', createDto);
    writeDtoFile(modelName, 'update', updateDto);
  });

  console.log('🎉 所有 DTO 生成完毕');
  generateBasicNestFile(targetModelName);
}

// CLI 参数支持：node generate-dto.js User
const modelArg = process.argv[2]; // undefined 表示全部模型
run(modelArg);
