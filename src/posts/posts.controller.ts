import { Auth } from '@/auth/decorators/auth.decorator'
import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Param,
	Post,
	Put,
	UsePipes,
	ValidationPipe
} from '@nestjs/common'
import { Role } from '@prisma/client'
import { PostDto } from './dto/post.dto'
import { PostsService } from './posts.service'

@Controller('posts')
export class PostsController {
	constructor(private readonly postsService: PostsService) {}
	@Get(':category')
	async getPostsByCategory(@Param() params: any) {
		return this.postsService.getPostsByCategory(params.category)
	}

	@Get()
	async getPosts() {
		return this.postsService.getPosts()
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Auth(Role.ADMIN)
	@Post()
	async createPost(@Body() dto: PostDto) {
		return this.postsService.createPost(dto)
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Auth(Role.ADMIN)
	@Put()
	async updatePost(@Body() dto: PostDto) {
		return this.postsService.updatePost(dto)
	}

	@Auth(Role.ADMIN)
	@Delete(':id')
	async deletePost(@Param('id') param: any) {
		return this.postsService.deletePost(param.id)
	}
}
