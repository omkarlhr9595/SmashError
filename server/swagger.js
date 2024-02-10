const swaggerAutogen = require("swagger-autogen");
const doc = {
  info: {
    title: "Smash Error API",
    description: "API for Smash Error",
  },
  host: "localhost:2200",
};

const outputFile = "./swagger-output.json";
const endpointsFiles = ["./src/routes/v1/auth.route.ts"];

swaggerAutogen()(outputFile, endpointsFiles, doc);