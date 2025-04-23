import { PrismaService } from '@/prisma.service'
import { Module } from '@nestjs/common'
import { CategoryController } from './category.controller'
import { CategoryService } from './category.service'

@Module({
	providers: [CategoryService, PrismaService],
	exports: [CategoryService],
	controllers: [CategoryController]
})
export class CategoryModule {}
