import { Readable } from 'stream';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBody,
  ApiConsumes,
  ApiCookieAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { User } from 'src/shared/auth/decorators/user.decorator';
import { Identity } from 'src/shared/auth/domain/identity';
import { AuthenticatedUserGuard } from 'src/shared/auth/guards/authenticated-user.guard';
import { UserService } from '../../services/user.service';
import { SignUpDto } from '../dto/sign-up.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserResponseDto } from '../dto/user.response.dto';

interface FileUpload {
  filename: string;
  mimetype: string;
  encoding: string;
  createReadStream: () => NodeJS.ReadableStream;
}

const toFileUpload = (file: Express.Multer.File): FileUpload => ({
  filename: file.originalname,
  mimetype: file.mimetype,
  encoding: file.encoding,
  createReadStream: () => Readable.from(file.buffer),
});

@ApiTags('users')
@Controller('users')
@UsePipes(
  new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }),
)
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @Get(':username')
  @ApiOperation({ summary: 'Get a user by username' })
  @ApiResponse({ status: 200, type: UserResponseDto })
  @ApiResponse({ status: 404, description: 'User not found' })
  async getByUsername(
    @Param('username') username: string,
  ): Promise<UserResponseDto> {
    const user = await this.userService.getUserByUsername(username);
    if (!user) {
      throw new NotFoundException(`User '${username}' not found`);
    }
    return UserResponseDto.fromDomain(user);
  }

  @Post('sign-up')
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(FileInterceptor('profilePicture'))
  @ApiOperation({ summary: 'Sign up a new user' })
  @ApiConsumes('multipart/form-data', 'application/json')
  @ApiBody({ type: SignUpDto })
  @ApiResponse({ status: 201, type: UserResponseDto })
  @ApiResponse({ status: 409, description: 'Username already exists' })
  async signUp(
    @Body() body: SignUpDto,
    @UploadedFile() file?: Express.Multer.File,
  ): Promise<UserResponseDto> {
    const user = await this.userService.signUp(
      {
        email: body.email,
        password: body.password,
        name: body.name,
        username: body.username,
      },
      file ? Promise.resolve(toFileUpload(file)) : undefined,
    );
    return UserResponseDto.fromDomain(user);
  }

  @Patch(':id')
  @UseGuards(AuthenticatedUserGuard)
  @ApiCookieAuth()
  @ApiOperation({ summary: 'Update a user' })
  @ApiResponse({ status: 200, type: UserResponseDto })
  @ApiResponse({ status: 403, description: 'Not allowed to update this user' })
  @ApiResponse({ status: 404, description: 'User not found' })
  async update(
    @User() identity: Identity,
    @Param('id') id: string,
    @Body() body: UpdateUserDto,
  ): Promise<UserResponseDto> {
    const user = await this.userService.updateUserById(identity, id, body);
    return UserResponseDto.fromDomain(user);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(AuthenticatedUserGuard)
  @ApiCookieAuth()
  @ApiOperation({ summary: 'Delete a user' })
  @ApiResponse({ status: 204, description: 'User deleted' })
  @ApiResponse({ status: 403, description: 'Not allowed to delete this user' })
  @ApiResponse({ status: 404, description: 'User not found' })
  async remove(
    @User() identity: Identity,
    @Param('id') id: string,
  ): Promise<void> {
    await this.userService.deleteUserById(identity, id);
  }
}
