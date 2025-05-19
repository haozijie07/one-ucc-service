
        import { Module } from '@nestjs/common';
        import { UserService } from './service';
        import { UserController } from './controller';

        @Module({
          controllers: [UserController],
          providers: [UserService],
        })

        export class UserModule {}
      