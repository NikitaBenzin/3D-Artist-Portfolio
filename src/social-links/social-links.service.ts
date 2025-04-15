import { PrismaService } from '@/prisma.service'
import { DataSocialLinks } from '@/social-links/dto/socialLinks.dto'
import { BadRequestException, Injectable } from '@nestjs/common'

@Injectable()
export class SocialLinksService {
	constructor(private prisma: PrismaService) {}

	async getSocialLinks() {
		return this.prisma.socialLinks.findMany({
			select: {
				id: true,
				socialMedia: true,
				link: true
			}
		})
	}

	async updateSocialLink(data: DataSocialLinks) {
		try {
			return await this.prisma.socialLinks.update({
				where: {
					id: data.data.id
				},
				data: {
					link: data.data.link
				}
			})
		} catch (error) {
			throw new BadRequestException('Incorrect data entered')
		}
	}
	async createSocialLink(userId: string, data: DataSocialLinks) {
		return await this.prisma.socialLinks.create({
			data: {
				user: {
					connect: {
						id: userId
					}
				},
				socialMedia: data.data.socialMedia,
				link: data.data.link
			}
		})
	}

	async deleteSocialLink(id: string) {
		const socialLink = await this.prisma.socialLinks.delete({
			where: {
				id
			}
		})

		return socialLink
	}
}
