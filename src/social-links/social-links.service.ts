import { PrismaService } from '@/prisma.service'
import { SocialLinksDto } from '@/social-links/dto/socialLinks.dto'
import { Injectable } from '@nestjs/common'

@Injectable()
export class SocialLinksService {
	constructor(private prisma: PrismaService) {}

	async getSocialLinks() {
		return this.prisma.socialLinks.findMany({
			select: {
				socialMedia: true,
				link: true
			}
		})
	}

	async updateSocialLinks(userId: string, data: SocialLinksDto) {
		try {
			return await this.prisma.socialLinks.update({
				where: {
					id: userId
				},
				data
			})
		} catch (error) {
			return null
		}
	}
	async createSocialLinks(userId: string, data: SocialLinksDto) {
		return await this.prisma.socialLinks.create({
			data: {
				userId: userId,
				...data
			}
		})
	}
}
