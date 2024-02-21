import { Server } from "http";
import prisma from "./client";
import app from "./app";
import config from "./config/config";


let server: Server;


prisma.$connect().then(() => {
  server = app.listen(config.port, () => {
    console.log(`🟢 Server is running on http://localhost:${config.port}`);
  });
});

const exitHandler = () => {
  if (server) {
    console.log("🔴 Server is stopping");
    server.close();
  }
  prisma.$disconnect();
};

const unexpectedErrorHandler = (error: unknown) => {
  exitHandler();
};

process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);

process.on("SIGTERM", () => {
  console.log("SIGTERM received");
  if (server) server.close();
});
