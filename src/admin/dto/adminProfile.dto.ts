import { IsOptional, IsString, MinLength } from 'class-validator'

export class AdminProfileDto {
	@IsString()
	@IsOptional()
	email?: string

	@IsString()
	@IsOptional()
	phone?: string

	@IsString()
	@IsOptional()
	name?: string

	@IsString()
	@IsOptional()
	@MinLength(6, {
		message: 'Password must be at least 6 characters long'
	})
	password?: string

	@IsString()
	@IsOptional()
	avatarPath?: string
}
