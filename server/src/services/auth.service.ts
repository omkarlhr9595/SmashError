import userService from "./user.service";
import { isPasswordMatch } from "../utils/encryption";
import exclude from "../utils/exclude";
import ApiError from "../utils/ApiError";
import httpStatus from "http-status";
import { Mentor, User } from "@prisma/client";
const loginUserWithEmailAndPassword = async (email: string, password: string): Promise<Omit<User | Mentor, "password">> => {
     let userData: User | Mentor | null = null;

    // Try to get user by email
    userData = await userService.getUserByEmail(email, [
        "id",
        "email",
        "name",
        "password",
        "role",
        "points",
        "rollNo",
        "className",
        "createdAt",
    ]);

    // If user doesn't exist, try to get mentor by email
    if (!userData) {
        userData = await userService.getMentorByEmail(email, [
            "id",
            "email",
            "name",
            "password",
            "experience",
            "role",
            "linkedIn",
            "organization",
            "expertise",
            "profilePic",
            "createdAt",
        ]);
    }

    // If neither user nor mentor found, throw error
    if (!userData) {
        throw new ApiError(httpStatus.UNAUTHORIZED, "Incorrect email or password");
    }

    // Check password
    if (!(await isPasswordMatch(password, userData.password))) {
        throw new ApiError(httpStatus.UNAUTHORIZED, "Incorrect email or password");
    }

    // Omit password field and return
    return exclude(userData, ["password"]);

    

};


export default {
    loginUserWithEmailAndPassword,
};