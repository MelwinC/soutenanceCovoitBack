const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: "API Soutenance Covoiturage",
            version: "1.0.0",
            description: "Documentation de mon API Soutenance Covoiturage",
        },
    },
    apis: ["./routes/*.js"],
};

const specs = swaggerJsdoc(options);

module.exports = { specs, swaggerUi };
