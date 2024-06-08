import { PrismaClient } from "@prisma/client"
import { hashSync } from "bcrypt"

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

function passwordVerify(password) {

    const passwordMissingCharacters = []

    // .length: retorna o tamanho da string (da senha)
    if (password.length < 8) {
        passwordMissingCharacters.push("A senha deve conter, no mínimo, 8 caracteres.")
    }

    // contadores
    let smallLetters = 0
    let bigLetters = 0
    let numbers = 0
    let simbols = 0

    // senha = "abc123"
    // letra = "a"

    // percorre as letras da variável senha
    for (const character of password) {
        // expressão regular
        if ((/[a-z]/).test(character)) {
            smallLetters++
        }
        else if ((/[A-Z]/).test(character)) {
            bigLetters++
        }
        else if ((/[0-9]/).test(character)) {
            numbers++
        } else {
            simbols++
        }
    }

    if (smallLetters == 0 || bigLetters == 0 || numbers == 0 || simbols == 0) {
        passwordMissingCharacters.push("A senha deve conter letras minúsculas, letras maiúsculas, números e símbolos.")
    }

    return passwordMissingCharacters
}

function emailVerify(email) {
    var regex = /\S+@\S+\.\S+/;
    return regex.test(email);
}

export const createUser = async (req, res) => {
    const { email, password, name } = req.body

    if (!email || !password) {
        res.status(400).json({ erro: "E-mail e senha são obrigatórios!" })
        return
    }

    const isValidEmail = emailVerify(email)
    if (!isValidEmail) {
        res.status(405).json({ erro: "E-mail inválido!" })
        return
    } 

    const message = passwordVerify(password)
    if (message.length > 0) {
        res.status(400).json({ erro: message.join("-") })
        return
    }

    const hashedPassword = hashSync(password, 10)

    try {
        const user = await userClient.create({
            data: { email, password: hashedPassword, name }
        })
        res.status(201).json({ data: {
            userId: user.id,
            userName: user.name
        } })
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