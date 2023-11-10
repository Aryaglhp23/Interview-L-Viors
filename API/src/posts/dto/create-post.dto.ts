import { IsDateString, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreatePostDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  content: string;

  @IsDateString()
  createdAt?: string = new Date().toISOString();

  authorId: number;
}
