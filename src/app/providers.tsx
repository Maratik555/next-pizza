'use client';

import React from 'react';
import { Toaster } from 'react-hot-toast';
import NextTopLoader from 'nextjs-toploader';
import { SessionProvider } from 'next-auth/react';

export const Providers = ({ children }: React.PropsWithChildren) => {
	return (
		<>
			<SessionProvider>{children}</SessionProvider>
			<NextTopLoader />
			<Toaster />
		</>
	);
};
