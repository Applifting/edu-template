import { ApiProperty } from '@nestjs/swagger';
import { User, UserRoleEnum } from '../../domain/user';

export class UserResponseDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  name!: string;

  @ApiProperty()
  email!: string;

  @ApiProperty()
  username!: string;

  @ApiProperty({ required: false, nullable: true })
  profileImageUrl?: string | null;

  @ApiProperty({ enum: UserRoleEnum, enumName: 'UserRoleEnum' })
  role!: UserRoleEnum;

  static fromDomain(user: User): UserResponseDto {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      username: user.username,
      profileImageUrl: user.profileImageUrl ?? null,
      role: user.role,
    };
  }
}
