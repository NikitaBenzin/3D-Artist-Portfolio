import { Controller, Get } from '@nestjs/common'
import { HomeService } from './home.service'

@Controller('home')
export class HomeController {
	constructor(private readonly homeService: HomeService) {}

	@Get('posts')
	async getPosts() {
		return this.homeService.getPosts()
	}

	@Get('socialLinks')
	async getSocialLinks() {
		return this.homeService.getSocialLinks()
	}
}
