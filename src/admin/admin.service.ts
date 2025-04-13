import { AuthDto } from '@/auth/dto/auth.dto'
import { Injectable } from '@nestjs/common'
import { hash } from 'argon2'

import { PrismaService } from 'src/prisma.service'
import { AdminProfileDto } from './dto/adminProfile.dto'

@Injectable()
export class AdminService {
	constructor(private prisma: PrismaService) {}

	async create(data: AuthDto) {
		const admin = this.prisma.user.create({
			data: {
				...data,
				password: await hash(data.password)
			}
		})

		return admin
	}

	async getById(id: string) {
		return this.prisma.user.findUnique({
			where: {
				id
			}
		})
	}

	async getByEmail(email: string) {
		return this.prisma.user.findUnique({
			where: {
				email
			}
		})
	}

	async updateProfile(id: string, data: AdminProfileDto) {
		return data.password
			? this.prisma.user.update({
					where: {
						id
					},
					data: {
						...data,
						password: await hash(data.password)
					}
				})
			: this.prisma.user.update({
					where: {
						id
					},
					data: {
						...data
					}
				})
	}
}
