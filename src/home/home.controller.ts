import { Controller, Get } from '@nestjs/common'
import { HomeService } from './home.service'

@Controller()
export class HomeController {
	constructor(private readonly homeService: HomeService) {}

	@Get('socialLinks')
	async getSocialLinks() {
		return this.homeService.getSocialLinks()
	}
}
