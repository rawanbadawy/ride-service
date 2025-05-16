
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const zones = await prisma.zone.findMany(); // Ensure 'zone' exists in schema.prisma
    console.log(zones);
}

main()
    .catch(e => console.error(e))
    .finally(() => prisma.$disconnect());
