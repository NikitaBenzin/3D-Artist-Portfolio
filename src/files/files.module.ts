import { Module } from '@nestjs/common'
import { ServeStaticModule } from '@nestjs/serve-static'
import { path } from 'app-root-path'
import { PrismaService } from 'src/prisma.service'
import { FileController } from './files.controller'
import { FileService } from './files.service'

@Module({
	imports: [
		ServeStaticModule.forRoot({
			rootPath: `${path}/uploads`,
			serveRoot: '/uploads'
		})
	],
	controllers: [FileController],
	providers: [FileService, PrismaService]
})
export class FileModule {}
