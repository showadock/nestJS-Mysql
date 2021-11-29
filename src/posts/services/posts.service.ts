import { Injectable, NotFoundException } from '@nestjs/common';

import { Post } from '../entities/post.entity';
import { CreatePostDto, UpdatePostDto } from '../dtos/post.dtos';

@Injectable()
export class PostsService {
  private counterId = 1;
  private posts: Post[] = [
    {
      id: 1,
      name: 'Post 1',
      description: 'lorem lorem',
      image: 'https://i.imgur.com/U4iGx1j.jpeg',
    },
  ];

  findAll() {
    return this.posts;
  }

  findOne(id: number) {
    const post = this.posts.find((item) => item.id === id);
    if (!post) {
      throw new NotFoundException(`post #${id} not found`);
    }
    return post;
  }

  create(data: CreatePostDto) {
    this.counterId = this.counterId + 1;
    const newPost = {
      id: this.counterId,
      ...data,
    };
    this.posts.push(newPost);
    return newPost;
  }

  update(id: number, changes: UpdatePostDto) {
    const post = this.findOne(id);
    const index = this.posts.findIndex((item) => item.id === id);
    this.posts[index] = {
      ...post,
      ...changes,
    };
    return this.posts[index];
  }

  remove(id: number) {
    const index = this.posts.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new NotFoundException(`post #${id} not found`);
    }
    this.posts.splice(index, 1);
    return true;
  }
}
