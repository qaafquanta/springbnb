import dotenv from 'dotenv';
dotenv.config();
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import authRouter from './routes/auth.routes.js';
import propertyRouter from './routes/property.route.js';
import roomTypeRouter from './routes/roomType.route.js';
import peakSeasonRateRouter from './routes/peak-season-rate.route.js';
const port = process.env.PORT || 8000;
const app = express();
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/auth", authRouter);
app.use("/property", propertyRouter);
app.use("/room-type", roomTypeRouter);
app.use("/peak-season-rate", peakSeasonRateRouter);
//middleware error handler
app.use((error, req, res) => {
    console.error(error);
    res.status(error.code || 5000).send(error);
});
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map