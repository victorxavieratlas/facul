import { PrismaClient } from "@prisma/client"

const userClient = new PrismaClient().user

export const getAllUsers = async (req, res) => {
    try {
        const allUser = await userClient.findMany({
            include: {
                profile: true
            }
        })
        res.status(200).json({ data: allUser })
    } catch (error) {
        res.status(400).json(error)
    }
}

export const getUserById = async (req, res) => {
    const { id } = req.params

    try {
        const user = await userClient.findUnique({
            where: { id: Number(id) },
            include: {
                profile: true
            }
        })
        res.status(200).json({ data: user })
    } catch (error) {
        res.status(400).json(error)
    }
}

export const createUser = async (req, res) => {
    const { email, password, name } = req.body

    if (!email || !password) {
        res.status(400).json({ "erro": "Email and Password are required!" })
        return
    }

    try {
        const user = await userClient.create({
            data: { email, password, name }
        })
        res.status(201).json({ data: user })
    } catch (error) {
        res.status(400).json(error)
    }
}

export const deleteUser = async (req, res) => {
    const { id } = req.params

    try {
        const user = await userClient.delete({
            where: { id: Number(id) }
        })
        res.status(200).json({ data: user })
    } catch (error) {
        res.status(400).json(error)
    }
}

export const softDeleteUser = async (req, res) => {
    const { id } = req.params
    const deletedAt = new Date()

    try {
        const user = await userClient.update({
            where: { id: Number(id) },
            data: { deletedAt }
        })
        res.status(200).json({ data: user })
    } catch (error) {
        res.status(400).json(error)
    }
}

export const updateUser = async (req, res) => {
    const { id } = req.params
    const { email, password, name } = req.body

    if (!email || !password || !name) {
        res.status(400).json({ "erro": "Email, Password and Name are required!" })
        return
    }

    try {
        const user = await userClient.update({
            where: { id: Number(id) },
            data: { email, password, name },
        })
        res.status(200).json({ data: user })
    } catch (error) {
        res.status(400).json(error)
    }
}

export const userRoleUpdate = async (req, res) => {
    const { id } = req.params
    const { role } = req.body

    if (!role) {
        res.status(400).json({ "erro": "role are required!" })
        return
    }

    try {
        const user = await userClient.update({
            where: { id: Number(id) },
            data: { role }
        })
        res.status(200).json({ data: user })
    } catch (error) {
        res.status(400).json(error)
    }
}