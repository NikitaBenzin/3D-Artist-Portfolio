import { Injectable } from '@nestjs/common'
import { path } from 'app-root-path'
import { ensureDir, remove, writeFile } from 'fs-extra'
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

	async removeFile(fileId: string) {
		try {
			const file = await this.prisma.file.delete({
				where: {
					id: fileId
				}
			})
			await remove(`${path}${file.fileUrl}`)

			return file
		} catch (error) {
			return error
		}
	}

	async getFiles() {
		return this.prisma.file.findMany({
			select: {
				id: true,
				title: true,
				fileUrl: true
			},
			orderBy: {
				createdAt: 'desc'
			}
		})
	}
}
