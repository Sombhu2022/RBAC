import express from "express";
import "dotenv/config";
import { corsConfig } from "./src/config/cors.config.js";
import { rateLimit } from "./src/middlewares/rateLimit.middleware.js";
import { basicRouter } from "./src/routes/basic.router.js";
import { dbConection } from "./src/database/connection.js";



const startServer = async () => {
  try {
    const app = express();

    // Middleware for CORS
    app.use( corsConfig );

    // database connection
    await dbConection();

    // Use rate limit middleware globally - for prevent DDOS attack and bots detaction 
    app.use(rateLimit);

    // Define routes
    app.use('/api/v1/data' , basicRouter )
  

    // Start the server
    const PORT = process.env.PORT || 8080;
    app.listen(PORT, () => {
      console.info(`Server is running at http://localhost:${PORT}`);
    });


  } catch (error) {
    console.error("Error starting the server:", error);
    process.exit(1); // Exit the process on server start failure
  }
};

startServer();
