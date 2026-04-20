import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiCookieAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { User } from 'src/shared/auth/decorators/user.decorator';
import { Identity } from 'src/shared/auth/domain/identity';
import { AuthenticatedUserGuard } from 'src/shared/auth/guards/authenticated-user.guard';
import { QuacksService } from '../../services/quacks.service';
import { CreateQuackDto } from '../dto/create-quack.dto';
import { QuackResponseDto } from '../dto/quack.response.dto';

@ApiTags('quacks')
@Controller('quacks')
@UsePipes(
  new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }),
)
export class QuacksController {
  constructor(private readonly quacksService: QuacksService) {}

  @Get()
  @ApiOperation({ summary: 'List all quacks' })
  @ApiResponse({ status: 200, type: [QuackResponseDto] })
  async list(): Promise<QuackResponseDto[]> {
    const quacks = await this.quacksService.getQuacks();
    return quacks.map(QuackResponseDto.fromDomain);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(AuthenticatedUserGuard)
  @ApiCookieAuth()
  @ApiOperation({ summary: 'Create a quack' })
  @ApiResponse({ status: 201, type: QuackResponseDto })
  async create(
    @User() user: Identity,
    @Body() body: CreateQuackDto,
  ): Promise<QuackResponseDto> {
    const quack = await this.quacksService.createQuack(user, {
      text: body.text,
    });
    return QuackResponseDto.fromDomain(quack);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(AuthenticatedUserGuard)
  @ApiCookieAuth()
  @ApiOperation({ summary: 'Delete a quack by id' })
  @ApiResponse({ status: 204, description: 'Quack deleted' })
  @ApiResponse({ status: 404, description: 'Quack not found' })
  @ApiResponse({ status: 403, description: 'Not allowed to delete this quack' })
  async remove(@User() user: Identity, @Param('id') id: string): Promise<void> {
    await this.quacksService.deleteQuack(user, id);
  }
}
