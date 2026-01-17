import dotenv from 'dotenv';
dotenv.config();
import cookieParser from 'cookie-parser';
import cors from 'cors';
import type { Express, Request, Response } from 'express';
import  express  from 'express';
import  authRouter  from './routes/auth.routes.js';
import propertyRouter from './routes/property.route.js';
import roomTypeRouter from './routes/roomType.route.js';
import peakSeasonRateRouter from './routes/peak-season-rate.route.js';
import roomRouter from './routes/room.route.js';
import roomAvailabilityRouter from './routes/room-availability.route.js';
import dashboardRouter from './routes/dashboard.route.js';
import propertyCategoryRouter from './routes/property-category.route.js';
const port = process.env.PORT || 8000;
const app: Express = express();

app.use(cors({
  origin: ["http://localhost:3000", (process.env.FRONTEND_URL as string)],
  credentials:true
}));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

app.use("/auth",authRouter);
app.use("/property",propertyRouter)
app.use("/room-type",roomTypeRouter)
app.use("/peak-season-rate",peakSeasonRateRouter)
app.use("/room",roomRouter)
app.use("/room-availability",roomAvailabilityRouter)
app.use("/dashboard",dashboardRouter)
app.use("/property-category",propertyCategoryRouter)

//middleware error handler
app.use((error:any,req:Request,res:Response)=>{
  console.error(error)
  res.status(error.code || 5000).send(error)
})

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
