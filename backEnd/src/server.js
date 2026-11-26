import app from "./app.js";
import { env } from "./config/env.js";
import {
    connectDatabase,
    disconnectDatabase
} from "./config/database.js";

let server;

const startServer = async () => {
    try {
        await connectDatabase();

        server = app.listen(env.PORT, () => {
            console.log(`PayX Server running on port ${env.PORT}`);
            console.log(`Environment: ${env.NODE_ENV}`);
        });

    } catch (error) {
        console.error("PayX startup failed:", error.message);
        process.exit(1);
    }
};

const shutdown = async (signal) => {
    console.log(`${signal} received. Shutting down PayX...`);

    if (server) {
        server.close(async () => {
            await disconnectDatabase();
            process.exit(0);
        });
    } else {
        await disconnectDatabase();
        process.exit(0);
    }
};

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));

startServer();