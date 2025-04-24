'use client';

import React from 'react';
import { Toaster } from 'react-hot-toast';
import NextTopLoader from 'nextjs-toploader';
import { SessionProvider } from 'next-auth/react';

export const Providers = ({ children }: React.PropsWithChildren) => {
	const [mounted, setMounted] = React.useState(false);

	React.useEffect(() => setMounted(true), []);

	if (!mounted) {
		return null;
	}

	return (
		<>
			<SessionProvider>{children}</SessionProvider>
			<NextTopLoader />
			<Toaster />
		</>
	);
};
