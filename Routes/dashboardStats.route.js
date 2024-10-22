import express from 'express';
import { getDashboardData } from "../controllers/dashboardStats.controller.js";

const router = express.Router();
// Example route in your `routes.js` or `app.js`
router.get("/", getDashboardData);

export default router;