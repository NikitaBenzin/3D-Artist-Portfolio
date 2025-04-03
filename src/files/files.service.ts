import { Injectable } from '@nestjs/common'
import { path } from 'app-root-path'
import { ensureDir, writeFile } from 'fs-extra'
import { PrismaService } from 'src/prisma.service'

@Injectable()
export class FileService {
	constructor(private prisma: PrismaService) {}
	async saveFile(file: Express.Multer.File, folder: string = 'default') {
		const uploadFolder = `${path}/uploads/${folder}`
		await ensureDir(uploadFolder)
		await writeFile(`${uploadFolder}/${file.originalname}`, file.buffer)

		return this.prisma.file.create({
			data: {
				title: file.originalname,
				fileUrl: `/uploads/${folder}/${file.originalname}`
			}
		})
	}
}
