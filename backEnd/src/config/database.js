import {PrismaClient} from "../../generated/prisma/client.ts";
import { PrismaPg } from "@prisma/adapter-pg";
import {env} from "./env.js";


const adapter = new PrismaPg({
    connectionString: env.DATABASE_URL
});

const prisma = new PrismaClient({
    adapter
});

export const connectDatabase = async () =>{
    try{
        await prisma.$connect();

        await prisma.$queryRaw`SELECT 1`;

        console.log("PayX PostgreSQL connected successfully");
    }catch(error){
        console.error("Database connection failled", error.message);
        throw error;
    }
};

export const disconnectDatabase = async () =>{
    await prisma.$disconnect();
}

export default prisma;