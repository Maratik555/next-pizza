import { PrismaClient } from '@prisma/client';

const prismaClientSingleton = () => {
	return new PrismaClient();
};

declare global {
	var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>;
}

export const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

// В режиме разработки сохраняем prisma instance в глобальной переменной
// для предотвращения множественных инстансов в hot-reload
if (process.env.NODE_ENV !== 'production') {
	globalThis.prismaGlobal = prisma;
}
