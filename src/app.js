const express = require('express');
const cors = require('cors');
const bodyParser = require("body-parser");
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const dotenv = require('dotenv');
const userRoutes = require('./router/authRoutes');
dotenv.config();


const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));


const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'User Services API',
            version: '1.0.0',
            description: 'API for user services (authentication, profile management, etc.)'
        },
        servers: [
            { url: 'http://localhost:3000' }
        ]
    },
    apis: ['./src/router/*.js']
};
const specs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs));

// Register routes
app.use('/api', userRoutes);


module.exports = app;
