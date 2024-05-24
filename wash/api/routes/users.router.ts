import { Router } from "express"

import { createUser, deleteUser, getAllUsers, getUserById, softDeleteUser, updateUser, userRoleUpdate } from "../controllers/users.controller"

const usersRouter = Router()

usersRouter
    .get("/", getAllUsers)
    .get("/:id", getUserById)
    .post("/", createUser)
    .delete("/:id", deleteUser)
    .put("/delete/:id", softDeleteUser)
    .put("/:id", updateUser)
    .put("/role-update/:id", userRoleUpdate)

export default usersRouter
