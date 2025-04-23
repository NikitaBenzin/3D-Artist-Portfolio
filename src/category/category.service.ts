import { PrismaService } from '@/prisma.service'
import { Injectable } from '@nestjs/common'
import { CategoryDto } from './dto/category.dto'

@Injectable()
export class CategoryService {
	constructor(private prisma: PrismaService) {}

	async getAllCategory() {
		return this.prisma.category.findMany({
			select: {
				title: true,
				description: true,
				posts: {
					take: 1
				}
			}
		})
	}

	async getPostsByCategory(categoryId: number) {
		try {
			const posts = await this.prisma.category.findUnique({
				where: {
					id: categoryId
				}
				// select: {

				// 	posts: true
				// }
			})

			return posts
		} catch (error) {
			return null
		}
	}

	async updateCategory({ data }: CategoryDto) {
		return this.prisma.category.update({
			where: {
				id: data.id
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
