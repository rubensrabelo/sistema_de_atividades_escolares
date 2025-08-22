import express from "express";
import cors from "cors";

import { connectDB } from "./config/db";
import { ENV } from "./config/env";
import authRouter from "./routes/auth.routes";
import userRouter from "./routes/user.routes";
import courseRouter from "./routes/course.routes";
import enrollmentRouter from "./routes/enrollment.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/courses", courseRouter);
app.use("/api/enrollments", enrollmentRouter);

connectDB();

app.listen(ENV.PORT, () => {
    console.log(`Server running at http://localhost:${ENV.PORT}`);
});