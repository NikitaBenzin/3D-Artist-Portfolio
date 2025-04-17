import { Injectable } from '@nestjs/common'

import { path as appRootPath } from 'app-root-path'
import { ensureDir, remove, writeFile } from 'fs-extra'
import * as path from 'path'
import { PrismaService } from 'src/prisma.service'
import { IFile, IMediaResponse } from './file.interface'
import { generateFilename } from './generate-filename'

@Injectable()
export class FileService {
	constructor(private prisma: PrismaService) {}
	private readonly _outputDir = path.join(appRootPath, 'uploads')

	async saveMedia(
		files: IFile[],
		folder = 'default'
	): Promise<IMediaResponse[]> {
		const folderLowerCase = folder.toLowerCase()
		const uploadFolder = path.join(this._outputDir, folderLowerCase)
		await ensureDir(uploadFolder)

		const file = files[0]

		const uniqueFileName = generateFilename(file?.originalname || file?.name)
		const filePath = path.join(uploadFolder, uniqueFileName)

		await writeFile(filePath, file.buffer)

		await this.prisma.file.create({
			data: {
				title: uniqueFileName,
				fileUrl: `/uploads/${folderLowerCase}/${uniqueFileName}`
			}
		})

		return [
			{
				url: `/uploads/${folderLowerCase}/${uniqueFileName}`,
				name: uniqueFileName
			}
		]
	}

	async removeFile(fileId: string) {
		try {
			const file = await this.prisma.file.delete({
				where: {
					id: fileId
				}
			})

			await remove(path.join(appRootPath, file.fileUrl))
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
