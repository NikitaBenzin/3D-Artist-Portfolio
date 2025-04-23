import { PostDto } from '@/posts/dto/post.dto'

export class CategoryDto {
	data: {
		id?: number

		title?: string

		description?: string

		imagePath?: string

		posts?: PostDto[]
	}
}
