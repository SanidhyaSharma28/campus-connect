import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

// Create a new PrismaClient or reuse the existing one in non-production environments
export const prisma = globalForPrisma.prisma || 
    new PrismaClient({
        log: ['query']
    });

if (process.env.NODE_ENV !== 'production') {
    globalForPrisma.prisma = prisma; // Properly assign the Prisma client
}
