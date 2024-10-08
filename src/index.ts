import "reflect-metadata";
import "./initialize/index.js";
import "./initializeApollo.js";
// import express from "express";
// import path from "path";
// import { fileURLToPath } from "url";

// const app = express();
// const port = 3000; // You can change this to the desired port

// // Get the directory name
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// // Define the static folder
// app.use('/public', express.static(path.join(__dirname, 'public')));

// // Start the server
// app.listen(port, () => {
//     console.log(`Server is running at http://localhost:${port}`);
// });
console.log(process.env.MONGO_URI)