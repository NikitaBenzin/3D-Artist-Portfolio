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
	Query,
	UsePipes,
	ValidationPipe
} from '@nestjs/common'
import { Role } from '@prisma/client'
import { DataPost } from './dto/post.dto'
import { PostsService } from './posts.service'

@Controller('posts')
export class PostsController {
	constructor(private readonly postsService: PostsService) {}
	@Get('/category/:category')
	async getPostsByCategory(@Param() params: any) {
		return this.postsService.getPostsByCategory(params.category)
	}

	@Get()
	async getPosts() {
		return this.postsService.getPosts()
	}

	@Get('preview-category')
	async getFirstPostsByCategory() {
		return this.postsService.getFirstPostsByCategory()
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Auth(Role.ADMIN)
	@Post()
	async createPost(@Body() dto: DataPost) {
		return this.postsService.createPost(dto)
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Auth(Role.ADMIN)
	@Put()
	async updatePost(@Body() dto: DataPost) {
		return this.postsService.updatePost(dto)
	}

	@Auth(Role.ADMIN)
	@Delete()
	async deletePost(@Query('id') id: number) {
		return this.postsService.deletePost(id)
	}
}
