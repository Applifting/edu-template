import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/core/prisma/prisma.module';
import { QuackModule } from 'src/modules/quack/quack.module';
import { AuthModule } from 'src/shared/auth/auth.module';
import { PermissionsModule } from 'src/shared/permissions/permissions.module';
import { UsersController } from './controllers/users.controller';
import { UserRepository } from './repositories/user.repository';
import { UserService } from './services/user.service';

@Module({
  imports: [AuthModule, PrismaModule, PermissionsModule, QuackModule],
  controllers: [UsersController],
  providers: [UserRepository, UserService],
})
export class UsersModule {}
