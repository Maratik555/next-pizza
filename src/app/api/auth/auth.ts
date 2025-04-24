import { getServerSession } from 'next-auth/next';
import { authOptions } from './[...nextauth]/route';

export async function getSession() {
	return await getServerSession(authOptions);
}

export async function getCurrentUser() {
	const session = await getSession();

	return session?.user;
}
