import { AuthDto } from '@/auth/dto/auth.dto'
import { Injectable } from '@nestjs/common'
import { hash } from 'argon2'

import { PrismaService } from 'src/prisma.service'
import { AdminProfileDto } from './dto/adminProfile.dto'
import { PostDto } from './dto/post.dto'
import { SocialLinksDto } from './dto/socialLinks.dto'

@Injectable()
export class AdminService {
	constructor(private prisma: PrismaService) {}

	async create(data: AuthDto) {
		const admin = this.prisma.admin.create({
			data: {
				...data,
				password: await hash(data.password)
			}
		})

		await this.prisma.socialLinks.create({
			data: {
				telegramLink: '',
				artStationLink: '',
				instagramLink: '',
				youtubeLink: ''
			}
		})

		return admin
	}

	async getById(id: string) {
		return this.prisma.admin.findUnique({
			where: {
				id
			}
		})
	}

	async getByEmail(email: string) {
		return this.prisma.admin.findUnique({
			where: {
				email
			}
		})
	}

	async updateProfile(id: string, data: AdminProfileDto) {
		return data.password
			? this.prisma.admin.update({
					where: {
						id
					},
					data: {
						...data,
						password: await hash(data.password)
					}
				})
			: this.prisma.admin.update({
					where: {
						id
					},
					data: {
						...data
					}
				})
	}

	async updateSocialLinks(id: string, data: SocialLinksDto) {
		return await this.prisma.socialLinks.update({
			where: {
				id: 0
			},
			data
		})
	}

	// Admin Post

	async createPost(data: PostDto) {
		const posts = await this.prisma.post.create({
			data
		})

		return posts
	}
	async updatePosts(data: PostDto) {
		const posts = await this.prisma.post.update({
			where: {
				id: data.id
			},
			data
		})

		return posts
	}
}
