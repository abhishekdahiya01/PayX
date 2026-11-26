import prisma from "../config/database.js";

export const checkHealth = async (req, res, next) =>{
    try{
        await prisma.$queryRaw`SELECT 1`;

        return res.status(200).json({
            success: true,
            message: "PayX API is running",
            service: {
                server: "healthy",
                database: "connected"
            },
            timestamp: new Date().toISOString()
        });
    }catch(error){
        next(error);
    }
};