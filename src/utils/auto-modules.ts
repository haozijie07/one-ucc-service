import * as fs from 'fs';
import * as path from 'path';

export async function loadModulesFromDir(): Promise<any[]> {
  const modulesDir = path.resolve(__dirname, '../modules');
  const modules: any[] = [];

  const moduleFolders = fs
    .readdirSync(modulesDir, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory());

  for (const folder of moduleFolders) {
    const modulePath = path.join(modulesDir, folder.name, 'module.ts');
    const jsModulePath = path.join(modulesDir, folder.name, 'module.js'); // for ts-node/compiled code

    if (fs.existsSync(modulePath) || fs.existsSync(jsModulePath)) {
      const importPath = fs.existsSync(jsModulePath)
        ? `../modules/${folder.name}/module.js`
        : `../modules/${folder.name}/module.ts`;

      const mod = await import(importPath);
      // 默认导出或命名导出，兼容
      const moduleClass = mod.default || Object.values(mod)[0];
      modules.push(moduleClass);
    }
  }

  return modules;
}
