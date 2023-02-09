import { env } from '$env/dynamic/private';
import { postMethodFactory } from '$lib/factories/post-create-server';

const baseUrl = env.API_BASE_URL || 'http://localhost:3000';

export const POST = postMethodFactory(`${baseUrl}/api/v1/subject`);
