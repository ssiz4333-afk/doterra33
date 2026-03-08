import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
    const email = process.argv[2];
    const name = process.argv[3];
    const password = process.argv[4];

    if (!email || !name || !password) {
        console.error("Usage: npx tsx scripts/create-admin.ts <email> <name> <password>");
        process.exit(1);
    }

    const existing = await prisma.adminUser.findUnique({
        where: { email },
    });

    if (existing) {
        console.error(`Admin with email ${email} already exists.`);
        process.exit(1);
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const admin = await prisma.adminUser.create({
        data: {
            email,
            name,
            password: hashedPassword,
        },
    });

    console.log(`Successfully created admin user: ${admin.email}`);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
