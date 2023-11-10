import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdatePostDto {
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  title: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  content: string;

  createdAt: string;
  authorId: number;
}
