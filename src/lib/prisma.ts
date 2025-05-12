import { PrismaClient } from '@prisma/client';
import { pagination } from 'prisma-extension-pagination';

const prismaClientSingleton = () => {
	return new PrismaClient({
		log: ['query'],
	}).$extends(pagination());
};

declare global {
	// eslint-disable-next-line no-var
	var prismaGlobal: PrismaClient | undefined;
}

export const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

if (process.env.NODE_ENV === 'development') {
	globalThis.prismaGlobal = prisma as unknown as PrismaClient;
}
