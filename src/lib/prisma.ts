import { PrismaClient } from '@prisma/client';
import { pagination } from 'prisma-extension-pagination';

const prismaClientSingleton = () => {
    return new PrismaClient({
        log: ['query'],
    }).$extends(pagination());
};

declare global {
    var prismaGlobal: PrismaClient | undefined;
}

export const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

if (process.env.NODE_ENV !== 'production') { // @ts-ignore
    globalThis.prismaGlobal = prisma;
}