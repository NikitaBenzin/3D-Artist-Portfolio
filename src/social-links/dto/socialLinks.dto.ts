import { IsOptional, IsString } from 'class-validator'

export class SocialLinksDto {
	@IsString()
	@IsOptional()
	id?: string

	@IsString()
	@IsOptional()
	socialMedia?: string

	@IsString()
	@IsOptional()
	link?: string
}

export class DataSocialLinks {
	data: {
		id?: string

		socialMedia?: string

		link?: string
	}
}
