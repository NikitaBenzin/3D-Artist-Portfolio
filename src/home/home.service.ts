import { PrismaService } from '@/prisma.service'
import { Injectable } from '@nestjs/common'

@Injectable()
export class HomeService {
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
}
