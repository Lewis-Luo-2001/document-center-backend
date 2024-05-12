const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        "version": "1.0.0",           // by default: "1.0.0"
        "title": "Image Service",     // by default: "REST API"
        "description": ""             // by default: ""
    },
    host: "localhost:8082",           // by default: "localhost:3000"
    basePath: "",                     // by default: "/"
    tags: [                           // by default: empty Array
        {
            "name": "Image",          // Tag name
            "description": ""         // Tag description
        },
    ]
}

const outputFile = './swagger_output.json';
const endpointsFiles = ['./app.js'];

swaggerAutogen(outputFile, endpointsFiles);
