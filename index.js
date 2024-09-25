import express from "express";
import cors from "cors"
import { adminRouter } from "./Routes/AdminRoute.js";
import { signupRouter  } from "./Routes/SignupRoute.js";
import { userLoginRouter  } from "./Routes/UserLoginRouter.js";

const app = express()
app.use(cors({
    origin: ['http://localhost:5173'],
    methods: ['GET', 'POST', 'PUT'],
    credentials: true
}))

app.use(express.json())
app.use('/auth', adminRouter)
app.use('/auth', signupRouter);
app.use('/auth', userLoginRouter);

app.listen(3001, () => {
    console.log("Server is running")
})