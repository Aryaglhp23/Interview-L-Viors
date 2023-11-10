import {
  Controller,
  Req,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { AuthGuard } from './../auth/auth.guard';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Req() req, @Body() createPostDto: CreatePostDto) {
    createPostDto.authorId = req.user.id;
    return this.postsService.create(createPostDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  async findAll() {
    return await this.postsService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.postsService.findOne(+id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return await this.postsService.update(+id, updatePostDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postsService.remove(+id);
  }
}
