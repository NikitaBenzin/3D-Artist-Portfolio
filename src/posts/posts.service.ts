import { PrismaService } from '@/prisma.service'
import { Injectable } from '@nestjs/common'
import { DataPost } from './dto/post.dto'

@Injectable()
export class PostsService {
	constructor(private prisma: PrismaService) {}

	async getPosts() {
		return this.prisma.post.findMany()
	}

	async createPost(data: DataPost) {
		const posts = await this.prisma.post.create({
			data: {
				categoryName: data.data.categoryName,
				imagePath: data.data.imagePath,
				title: data.data.title
			}
		})

		return posts
	}
	async updatePost(data: DataPost) {
		const post = await this.prisma.post.update({
			where: {
				id: Number(data.data.id)
			},
			data: {
				imagePath: data.data.imagePath,
				title: data.data.title,
				categoryName: data.data.categoryName
			}
		})

		return post
	}
	async deletePost(postId: number) {
		const post = await this.prisma.post.delete({
			where: {
				id: Number(postId)
			}
		})

		return post
	}

	async getPostsByCategory(categoryName: string) {
		try {
			const posts = await this.prisma.post.findMany({
				where: {
					categoryName:
						categoryName.charAt(0).toUpperCase() + categoryName.slice(1)
				}
			})

			return posts
		} catch (error) {
			return null
		}
	}
}
