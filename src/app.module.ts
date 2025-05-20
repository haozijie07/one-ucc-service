import { Module } from '@nestjs/common';
import { loadModulesFromDir } from './utils/auto-modules';

@Module({
  imports: [],
})
export class AppModule {
  static async registerDynamicModules() {
    const dynamicModules = await loadModulesFromDir();
    return {
      module: AppModule,
      imports: [...dynamicModules],
    };
  }
}
