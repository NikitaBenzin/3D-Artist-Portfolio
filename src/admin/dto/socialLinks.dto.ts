import { IsOptional, IsString } from 'class-validator'

export class SocialLinksDto {
	@IsString()
	@IsOptional()
	artStationLink?: string

	@IsString()
	@IsOptional()
	instagramLink?: string

	@IsString()
	@IsOptional()
	youtubeLink?: string

	@IsString()
	@IsOptional()
	telegramLink?: string
}
