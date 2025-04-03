import {
	Controller,
	HttpCode,
	Post,
	Query,
	UploadedFile,
	UseInterceptors
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { Role } from '@prisma/client'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { FileService } from './files.service'

@Controller('files')
export class FileController {
	constructor(private readonly filesService: FileService) {}

	@Auth(Role.ADMIN)
	@HttpCode(200)
	@Post()
	@UseInterceptors(FileInterceptor('image'))
	async uploadFile(
		@UploadedFile() file: Express.Multer.File,
		@Query('folder') folder?: string
	) {
		return this.filesService.saveFile(file, folder)
	}
}
