import express from "express"
import userRoutes from "./routes/user.routes.js"
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import cors from "cors";  

dotenv.config();

const app = express();


app.use(cors({
  origin: ['http://127.0.0.1:5500', 'http://localhost:5500', 'http://localhost:5000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Database Connection
connectDB();

// Routes
app.use("/api/users", userRoutes);

app.listen(5000, () => {
  console.log(`Server is connected at http://localhost:5000`);
});