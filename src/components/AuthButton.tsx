'use client';

import { signIn, signOut, useSession } from 'next-auth/react';

export default function AuthButton() {
	const { data: session } = useSession();

	if (session && session.user) {
		return (
			<div className='flex gap-4 items-center'>
				<p>Привет, {session.user.name}!</p>
				<button
					onClick={() => signOut()}
					className='px-4 py-2 bg-primary text-white rounded-md'>
					Выйти
				</button>
			</div>
		);
	}

	return (
		<button
			onClick={() => signIn()}
			className='px-4 py-2 bg-primary text-white rounded-md'>
			Войти
		</button>
	);
}
