import { Auth } from '@/auth/decorators/auth.decorator'
import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Param,
	Post,
	Put,
	Query,
	UsePipes,
	ValidationPipe
} from '@nestjs/common'
import { Role } from '@prisma/client'
import { CategoryService } from './category.service'
import { CategoryDto } from './dto/category.dto'

@Controller('category')
export class CategoryController {
	constructor(private readonly categoryService: CategoryService) {}

	@Get('/:category')
	async getPostsByCategory(@Param() params: any) {
		return this.categoryService.getPostsByCategory(params.category)
	}

	@Get()
	async getAllCategory() {
		return this.categoryService.getAllCategory()
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Auth(Role.ADMIN)
	@Put()
	async updateCategory(@Body() dto: CategoryDto) {
		return this.categoryService.updateCategory(dto)
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Auth(Role.ADMIN)
	@Post()
	async createCategory(@Body() dto: CategoryDto) {
		return this.categoryService.createCategory(dto)
	}

	@Auth(Role.ADMIN)
	@Delete()
	async deleteCategory(@Query('id') id: number) {
		return this.categoryService.deleteCategory(id)
	}
}
