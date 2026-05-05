import { ApiProperty } from '@nestjs/swagger';
import { Quack } from '../../domain/quack';

export class QuackResponseDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  text!: string;

  @ApiProperty()
  userId!: string;

  @ApiProperty({ type: String, format: 'date-time' })
  createdAt!: Date;

  static fromDomain(quack: Quack): QuackResponseDto {
    return {
      id: quack.id,
      text: quack.text,
      userId: quack.userId,
      createdAt: quack.createdAt,
    };
  }
}
