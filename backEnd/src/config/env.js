import "dotenv/config";

const requiredEnv = ["DATABASE_URL"];

for(const key of requiredEnv) {
    if(!process.env[key]){
        throw new Error(`Missing enviroment variable: ${key}`);
    }
}

export const env ={
    NODE_ENV: process.env.NODE_ENV || "development",
    PORT: Number(process.env.PORT) || 7500,
    DATABASE_URL: process.env.DATABASE_URL
};

