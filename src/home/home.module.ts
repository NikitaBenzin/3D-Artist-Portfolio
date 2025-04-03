import { PrismaService } from '@/prisma.service'
import { Module } from '@nestjs/common'
import { HomeController } from './home.controller'
import { HomeService } from './home.service'

@Module({
	controllers: [HomeController],
	providers: [HomeService, PrismaService]
})
export class HomeModule {}
