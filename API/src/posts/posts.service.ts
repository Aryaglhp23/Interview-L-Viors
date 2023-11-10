import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}

  async create(createPostDto: CreatePostDto) {
    const createData = await this.prisma.post.create({
      data: createPostDto,
    });

    return {
      statusCode: 200,
      data: createData,
    };
  }

  async findAll() {
    const allPosts = await this.prisma.post.findMany();
    return {
      statusCode: 200,
      data: allPosts,
    };
  }

  async findOne(id: number) {
    const post = await this.prisma.post.findUnique({
      where: { id },
    });

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    return {
      statusCode: 200,
      data: post,
    };
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    const post = await this.prisma.post.findUnique({
      where: { id },
    });

    if (!post) {
      throw new NotFoundException('Post not found');
    }
    const { createdAt, authorId, ...updateData } = updatePostDto;

    const updatedPost = await this.prisma.post.update({
      where: { id },
      data: updateData,
    });

    return {
      statusCode: 200,
      data: updatedPost,
    };
  }

  async remove(id: number) {
    const post = await this.prisma.post.findUnique({
      where: { id },
    });

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    await this.prisma.post.delete({
      where: { id },
    });

    return {
      statusCode: 200,
      message: 'Post deleted successfully',
    };
  }
}
