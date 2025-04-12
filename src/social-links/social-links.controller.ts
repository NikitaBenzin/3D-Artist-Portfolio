import { Auth } from '@/auth/decorators/auth.decorator'
import { SocialLinksDto } from '@/social-links/dto/socialLinks.dto'
import {
	Body,
	Controller,
	Get,
	HttpCode,
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
	async updateSocialLinks(@Body() dto: SocialLinksDto) {
		return this.socialLinks.updateSocialLinks(dto)
	}
}
