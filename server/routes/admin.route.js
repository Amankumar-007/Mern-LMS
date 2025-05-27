import express from "express";
import { getAllUsers, toggleBlockUser, deleteUser, getAllCourses, deleteCourse } from "../controllers/admin.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import isAdmin from "../middlewares/isAdmin.js";

const router = express.Router();

// Protect all routes with authentication and admin middleware
router.use(isAuthenticated, isAdmin);

// User management routes
router.route("/users").get(getAllUsers);
router.route("/users/:userId/toggle-block").patch(toggleBlockUser);
router.route("/users/:userId").delete(deleteUser);

// Course management routes
router.route("/courses").get(getAllCourses);
router.route("/courses/:courseId").delete(deleteCourse);

export default router;
