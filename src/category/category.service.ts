import { PrismaService } from '@/prisma.service'
import { Injectable } from '@nestjs/common'
import { CategoryDto } from './dto/category.dto'

@Injectable()
export class CategoryService {
	constructor(private prisma: PrismaService) {}

	async getAllCategory() {
		return this.prisma.category.findMany({
			include: {
				posts: {
					take: 1
				}
			}
		})
	}

	async getPostsByCategory(id: number) {
		try {
			const posts = await this.prisma.category.findUnique({
				where: {
					id: Number(id)
				},
				include: {
					posts: true
				}
			})

			return posts
		} catch (error) {
			return null
		}
	}

	async updateCategory({ data }: CategoryDto) {
		return this.prisma.category.update({
			where: {
				id: Number(data.id)
			},
			data: {
				title: data.title,
				imagePath: data.imagePath,
				description: data.description
			}
		})
	}

	async createCategory({ data }: CategoryDto) {
		return this.prisma.category.create({
			data: {
				title: data.title,
				imagePath: data.imagePath,
				description: data.description
			}
		})
	}

	async deleteCategory(id: number) {
		return this.prisma.category.delete({
			where: {
				id: Number(id)
			}
		})
	}
}
