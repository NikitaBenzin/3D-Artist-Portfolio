import { IsNumber, IsOptional, IsString } from 'class-validator'

export class PostDto {
	@IsNumber()
	@IsOptional()
	id?: number

	@IsString()
	@IsOptional()
	title?: string

	@IsString()
	@IsOptional()
	imagePath?: string

	@IsNumber()
	@IsOptional()
	categoryId?: number
}

export class DataPost {
	data: {
		id?: number
		title?: string
		imagePath?: string
		categoryId?: number
	}
}
