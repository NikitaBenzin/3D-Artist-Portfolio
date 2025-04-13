import { Auth } from '@/auth/decorators/auth.decorator'
import { CurrentUser } from '@/auth/decorators/user.decorator'
import { SocialLinksDto } from '@/social-links/dto/socialLinks.dto'
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
import { SocialLinksService } from './social-links.service'

@Controller('social-links')
export class SocialLinksController {
	constructor(private readonly socialLinks: SocialLinksService) {}
	@Get()
	async getSocialLinks() {
		return this.socialLinks.getSocialLinks()
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Auth(Role.ADMIN)
	@Put()
	async updateSocialLinks(
		@CurrentUser('id') id: string,
		@Body() dto: SocialLinksDto
	) {
		return this.socialLinks.updateSocialLinks(id, dto)
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Auth(Role.ADMIN)
	@Post()
	async createSocialLinks(
		@CurrentUser('id') id: string,
		@Body() dto: SocialLinksDto
	) {
		return this.socialLinks.createSocialLinks(id, dto)
	}
}
