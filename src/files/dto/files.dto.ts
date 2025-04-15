import { IsOptional, IsString } from 'class-validator'

export class FilesDto {
	@IsString()
	@IsOptional()
	id?: string

	@IsString()
	@IsOptional()
	title?: string

	@IsString()
	@IsOptional()
	fileUrl?: string
}

export class DataFiles {
	data: {
		id?: string

		title?: string

		fileUrl?: string
	}
}
