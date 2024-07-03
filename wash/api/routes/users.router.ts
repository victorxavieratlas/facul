import { Router } from "express"

import { changeUserPassword, createUser, deleteUser, generateCode, getAllUsers, getUserById, softDeleteUser, updateUser, userRoleUpdate, validateCode } from "../controllers/users.controller"

const usersRouter = Router()

usersRouter
    .get("/", getAllUsers)
    .get("/:id", getUserById)
    .get("/generate-code/email", generateCode)
    .get("/validate-code/email/:id", validateCode)
    .put("/change/user/password/:id", changeUserPassword)
    .post("/", createUser)
    .delete("/:id", deleteUser)
    .put("/delete/:id", softDeleteUser)
    .put("/:id", updateUser)
    .put("/role-update/:id", userRoleUpdate)

export default usersRouter
