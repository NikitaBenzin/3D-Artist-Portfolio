import {
	Controller,
	Delete,
	Get,
	HttpCode,
	Post,
	Query,
	UploadedFiles,
	UseInterceptors,
	UsePipes
} from '@nestjs/common'
import { IFile } from '@nestjs/common/pipes/file/interfaces'
import { FilesInterceptor } from '@nestjs/platform-express'
import { Role } from '@prisma/client'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { FileService } from './files.service'
import { FileValidationPipe } from './pipes/file.validation.pipe'
import { FolderValidationPipe } from './pipes/folder.validation.pipe'

@Controller('files')
export class FileController {
	constructor(private readonly filesService: FileService) {}

	@Get()
	async getFiles() {
		return this.filesService.getFiles()
	}

	@Auth(Role.ADMIN)
	@HttpCode(200)
	@Post()
	@UseInterceptors(FilesInterceptor('file'))
	@UsePipes(new FolderValidationPipe())
	async uploadMediaFile(
		@UploadedFiles(FileValidationPipe) mediaFile: IFile[],
		@Query('folder') folder?: string
	) {
		return this.filesService.saveMedia(mediaFile, folder)
	}

	@Auth(Role.ADMIN)
	@HttpCode(200)
	@Delete()
	async removeFile(@Query('id') fileId: string) {
		return this.filesService.removeFile(fileId)
	}
}
