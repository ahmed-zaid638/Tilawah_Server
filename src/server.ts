// src/server.ts
import express, { Request, Response, json } from "express";
import path from 'path';
import fs from 'fs';
import dotenv from "dotenv";
import morgan from "morgan"; // Request logger
import helmet from "helmet"; // Security
import compression from "compression"; // Gzip compression
import cors from "cors"; // Enable CORS for cross-origin requests
import http from "http";
import https from "https";
import routes from './routes';
import sequelize from './models';

// Load environment variables
const environment = process.env.NODE_ENV || 'development';
const envFilePath = path.resolve(__dirname, `.env.${environment}`);
dotenv.config({ path: envFilePath });

const app = express();

// Middleware
app.use(express.json({ limit: '5mb' })); // parse requests of content-type - application/json
app.use(express.urlencoded({ extended: true })); // parse requests of content-type - application/x-www-form-urlencoded
app.use(helmet()); // Security headers
app.use(compression()); // Gzip compression for improved performance
// app.use(cors()); // TODO: Consider enabling CORS when production-ready

// Request logger middleware
app.use(morgan('common', { // log only 4xx and 5xx responses to console
  skip: function (req: Request, res: Response) { return res.statusCode < 400 }
}))
app.use(morgan('combined', { // log all requests to access.log
  stream: fs.createWriteStream(path.join(__dirname, '..', 'logs', 'access.log'), { flags: 'a' })
}))

app.use(routes);

// Graceful shutdown handler
function handleShutdown(signal: string) {
  console.log(`${new Date()} - Received ${signal}. Closing server gracefully...`);
  sequelize.close() // Close database connection
    .then(() => {
      console.log(`${new Date()} - Database connection closed.`);
      process.exit(0); // Exit gracefully
    })
    .catch(err => {
      console.error(`${new Date()} - Error closing database connection: ${err}`);
      process.exit(1);
    });
}

// Catch uncaught exceptions and unhandled rejections
process.on('uncaughtException', err => {
  console.error('Uncaught Exception:', err);
  process.exit(1);
});
process.on('unhandledRejection', err => {
  console.error('Unhandled Rejection:', err);
  process.exit(1);
});

// Start the server once DB is ready
sequelize
  .authenticate()
  .then(() => {
    console.log('Database connected successfully.');

    return sequelize.validate();
  })
  .then(() => {
    // SSL Certificate for production
    let credentials = {};
    if (environment !== 'development') {
      // Certificate
      const privateKeyPath = process.env.CERT_PRIV_KEY_PATH;
      const certificatePath = process.env.CERT_FULLCHAIN_PATH;
      const caPath = process.env.CERT_CHAIN_PATH;

      if (!privateKeyPath || !certificatePath || !caPath) {
        throw new Error("SSL certificate paths are not defined in the environment variables.");
      }

      const privateKey = fs.readFileSync(privateKeyPath, 'utf8');
      const certificate = fs.readFileSync(certificatePath, 'utf8');
      const ca = fs.readFileSync(caPath, 'utf8');

      credentials = {
        key: privateKey,
        cert: certificate,
        ca: ca
      };
    }

    // Redirect to HTTPS in production / staging
    if (environment !== 'development') {
      app.use(function (req, res, next) {
        if (req.secure) {
          next();
        } else {
          res.redirect(process.env.API_URL + req.originalUrl);
        }
      });
    }

    // Start the server
    const httpServer = http.createServer(app);
    const httpsServer = environment !== 'development' ? https.createServer(credentials, app) : null;

    httpServer.listen(process.env.HTTP_PORT || 80, () => {
      console.log(`HTTP Server running on port ${process.env.HTTP_PORT || 80} ${environment !== 'development' ? 'and will redirect to HTTPS' : ''}`);
    });

    if (environment !== 'development') httpsServer?.listen(process.env.HTTPS_PORT || 443, () => {
      console.log(`HTTPS Server running on port ${process.env.HTTPS_PORT || 443}`);
    });
  })
  .catch((err) => {
    console.error(`${new Date()} - Failed to connect to the database:`, err);
    process.exit(1);
  });

// Handle graceful shutdown on signals (e.g., SIGINT, SIGTERM)
process.on('SIGINT', () => handleShutdown('SIGINT'));
process.on('SIGTERM', () => handleShutdown('SIGTERM'));