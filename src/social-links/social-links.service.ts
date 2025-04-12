import { PrismaService } from '@/prisma.service'
import { SocialLinksDto } from '@/social-links/dto/socialLinks.dto'
import { Injectable } from '@nestjs/common'

@Injectable()
export class SocialLinksService {
	constructor(private prisma: PrismaService) {}

	async getSocialLinks() {
		return this.prisma.socialLinks.findFirst({
			select: {
				artStationLink: true,
				telegramLink: true,
				youtubeLink: true,
				instagramLink: true
			}
		})
	}

	async updateSocialLinks(data: SocialLinksDto) {
		return await this.prisma.socialLinks.update({
			where: {
				id: 0
			},
			data
		})
	}
}
