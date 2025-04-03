import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { ScheduleModule } from '@nestjs/schedule'
import { ServeStaticModule } from '@nestjs/serve-static'
import { GoogleRecaptchaModule } from '@nestlab/google-recaptcha'
import { join } from 'path'
import { AdminModule } from './admin/admin.module'
import { AuthModule } from './auth/auth.module'
import { getGoogleRecaptchaConfig } from './config/google-recaptcha.config'
import { FileModule } from './files/files.module'
import { HomeModule } from './home/home.module'
import { HomeService } from './home/home.service'
import { PrismaService } from './prisma.service'

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true
		}),
		GoogleRecaptchaModule.forRootAsync({
			imports: [ConfigModule],
			useFactory: getGoogleRecaptchaConfig,
			inject: [ConfigService]
		}),
		ServeStaticModule.forRoot({
			rootPath: join(__dirname, '..', 'uploads'), // Serve files from 'uploads' directory
			serveRoot: '/uploads' // Files will be accessible at '/uploads'
		}),
		ScheduleModule.forRoot(),
		AuthModule,
		AdminModule,
		FileModule,
		HomeModule
	],
	providers: [HomeService, PrismaService]
})
export class AppModule {}
