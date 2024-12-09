import express from "express";
import "dotenv/config";
import { corsConfig } from "./src/config/cors.config.js";
import { rateLimit } from "./src/middlewares/rateLimit.middleware.js";

import { dbConection } from "./src/database/connection.js";
import { userRouter } from "./src/routes/user.router.js";
import bodyParser from "body-parser";
import fileUpload from "express-fileupload";
import cookieParser from "cookie-parser";
import { blogRouter } from "./src/routes/blog.router.js";
import { cloudinaryConfig } from "./src/config/cloudinar.config.js";

import { reportRouter } from "./src/routes/report.router.js";


const startServer = async () => {
  try {
    const app = express();

    // Middleware for CORS
    app.use( corsConfig );

    // setup cloudinary
    cloudinaryConfig()
  
    app.use(bodyParser.json({limit:"50mb"}))
    app.use(express.json({ limit: '50mb' }))
    
    // Increase the request size limit for URL-encoded data
    app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
    
    app.use(fileUpload(
        {
         limits: { fileSize: 50 * 1024 * 1024 }, // 100 MB (adjust this as needed)
        }
    ))
    
    app.use(cookieParser())
    


    // database connection
    await dbConection();

    // Use rate limit middleware globally - for prevent DDOS attack and bots detaction 
    // app.use('/api/v1', rateLimit);

    // Define routes
    app.use('/api/v1/user' , rateLimit , userRouter)
    app.use('/api/v1/blog' , rateLimit , blogRouter)
    app.use('/api/v1/report' , rateLimit , reportRouter)
  

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
