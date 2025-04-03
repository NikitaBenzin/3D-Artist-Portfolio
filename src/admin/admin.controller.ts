import { Auth } from '@/auth/decorators/auth.decorator'
import { CurrentUser } from '@/auth/decorators/user.decorator'
import {
	Body,
	Controller,
	Get,
	HttpCode,
	Post,
	Put,
	UsePipes,
	ValidationPipe
} from '@nestjs/common'
import { Role } from '@prisma/client'
import { AdminService } from './admin.service'
import { AdminProfileDto } from './dto/adminProfile.dto'
import { PostDto } from './dto/post.dto'
import { SocialLinksDto } from './dto/socialLinks.dto'

@Controller('admin')
export class AdminController {
	constructor(private readonly adminService: AdminService) {}

	@Auth(Role.ADMIN)
	@Get('profile')
	async getProfile(@CurrentUser('id') id: string) {
		return this.adminService.getById(id)
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Auth(Role.ADMIN)
	@Put('profile')
	async updateProfile(
		@CurrentUser('id') adminId: string,
		@Body() dto: AdminProfileDto
	) {
		return this.adminService.updateProfile(adminId, dto)
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Auth(Role.ADMIN)
	@Put('socialLinks')
	async updateSocialLinks(
		@CurrentUser('id') adminId: string,
		@Body() dto: SocialLinksDto
	) {
		return this.adminService.updateSocialLinks(adminId, dto)
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Auth(Role.ADMIN)
	@Post('posts')
	async createPost(@Body() dto: PostDto) {
		return this.adminService.createPost(dto)
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Auth(Role.ADMIN)
	@Put('posts')
	async updatePosts(@Body() dto: PostDto) {
		return this.adminService.updatePosts(dto)
	}
}
