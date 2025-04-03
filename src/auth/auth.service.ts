import { AdminService } from '@/admin/admin.service'
import { PrismaService } from '@/prisma.service'
import {
	BadRequestException,
	Injectable,
	UnauthorizedException
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Role, type Admin } from '@prisma/client'
import { verify } from 'argon2'
import { omit } from 'lodash'
import { AuthDto } from './dto/auth.dto'

@Injectable()
export class AuthService {
	constructor(
		private jwt: JwtService,
		private adminService: AdminService,
		private prisma: PrismaService
	) {}

	private readonly TOKEN_EXPIRATION_ACCESS = '1h'
	private readonly TOKEN_EXPIRATION_REFRESH = '7d'

	async login(dto: AuthDto) {
		const isAdminExist = await this.prisma.admin.findUnique({
			where: {
				email: dto.email
			}
		})
		if (isAdminExist) {
			const admin = await this.validateAdmin(dto)
			return this.buildResponseObject(admin)
		} else {
			throw new BadRequestException('You are not allowed to login!')
		}
	}

	async register(dto: AuthDto) {
		const isAdminExist = await this.prisma.admin.findFirst()
		if (!isAdminExist) {
			const admin = await this.adminService.create(dto)
			return this.buildResponseObject(admin)
		} else {
			throw new BadRequestException('You are not allowed to register!')
		}
	}

	async getNewTokens(refreshToken: string) {
		const result = await this.jwt.verifyAsync(refreshToken)
		if (!result) {
			throw new UnauthorizedException('Invalid refresh token')
		}
		const admin = await this.adminService.getById(result.id)
		return this.buildResponseObject(admin)
	}

	async buildResponseObject(admin: Admin) {
		const tokens = await this.issueTokens(admin.id, admin.rights || [])
		return { admin: this.omitPassword(admin), ...tokens }
	}

	private async issueTokens(adminId: string, rights: Role[]) {
		const payload = { id: adminId, rights }
		const accessToken = this.jwt.sign(payload, {
			expiresIn: this.TOKEN_EXPIRATION_ACCESS
		})
		const refreshToken = this.jwt.sign(payload, {
			expiresIn: this.TOKEN_EXPIRATION_REFRESH
		})
		return { accessToken, refreshToken }
	}

	private async validateAdmin(dto: AuthDto) {
		const admin = await this.adminService.getByEmail(dto.email)
		if (!admin) {
			throw new UnauthorizedException('Email or password invalid')
		}
		const isValid = await verify(admin.password, dto.password)
		if (!isValid) {
			throw new UnauthorizedException('Email or password invalid')
		}
		return admin
	}

	private omitPassword(admin: Admin) {
		return omit(admin, ['password'])
	}
}
