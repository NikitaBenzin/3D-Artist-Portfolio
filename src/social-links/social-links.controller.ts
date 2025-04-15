import { Auth } from '@/auth/decorators/auth.decorator'
import { CurrentUser } from '@/auth/decorators/user.decorator'
import { DataSocialLinks } from '@/social-links/dto/socialLinks.dto'
import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Post,
	Put,
	Query,
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
	async updateSocialLink(@Body() dto: DataSocialLinks) {
		return this.socialLinks.updateSocialLink(dto)
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Auth(Role.ADMIN)
	@Post()
	async createSocialLink(
		@CurrentUser('id') id: string,
		@Body() dto: DataSocialLinks
	) {
		return this.socialLinks.createSocialLink(id, dto)
	}

	@Auth(Role.ADMIN)
	@Delete()
	async deleteSocialLink(@Query('id') id: string) {
		return this.socialLinks.deleteSocialLink(id)
	}
}
