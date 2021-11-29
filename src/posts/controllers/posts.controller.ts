import {
  Controller,
  Get,
  Query,
  Param,
  Post,
  Body,
  Put,
  Delete,
  HttpStatus,
  HttpCode,
  Res,
  // ParseIntPipe,
} from '@nestjs/common';
import { Response } from 'express';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

import { ParseIntPipe } from '../../common/parse-int.pipe';
import { CreatePostDto, UpdatePostDto } from '../dtos/post.dtos';
import { PostsService } from '../services/posts.service';

@ApiTags('posts')
@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Get()
  @ApiOperation({ summary: 'List of posts' })
  getposts(
    @Query('limit') limit = 100,
    @Query('offset') offset = 0,
    @Query('brand') brand: string,
  ) {
    return this.postsService.findAll();
  }

  @Get('filter')
  getPostFilter() {
    return `yo soy un filter`;
  }

  @Get(':postId')
  @HttpCode(HttpStatus.ACCEPTED)
  getOne(@Param('postId', ParseIntPipe) postId: number) {
    return this.postsService.findOne(postId);
  }

  @Post()
  create(@Body() payload: CreatePostDto) {
    return this.postsService.create(payload);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() payload: UpdatePostDto) {
    return this.postsService.update(+id, payload);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.postsService.remove(+id);
  }
}
