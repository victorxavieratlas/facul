import { PrismaClient } from "@prisma/client"
import { hashSync } from "bcrypt"

const prisma = new PrismaClient()
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
        res.status(201).json({
            data: {
                userId: user.id,
                userName: user.name
            }
        })
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

        await prisma.log.create({
            data: {
                description: "Usuário deletado!",
                userId: id
            }
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

export const generateCode = async (req, res) => {
    const { email } = req.body

    if (!email) {
        res.status(400).json({ "erro": "E-mail é obrigatório!" })
        return
    }

    const isValidEmail = emailVerify(email)
    if (!isValidEmail) {
        res.status(405).json({ erro: "E-mail inválido!" })
        return
    }
    //talvez adicionar verificação se existe código válido
    const randomCode = Math.floor(Math.random() * 900000) + 100000;

    try {
        const [user, code] = await prisma.$transaction([
            prisma.user.findUnique({ where: { email } }),
            prisma.code.create({
                data: {
                    email: email,
                    code: randomCode.toString(),
                    createdAt: new Date()
                }
            })
        ])

        if (user) {
            if (code) {
                res.status(200).json({
                    data: {
                        code: code.code,
                        userId: user.id,
                        email: email,
                    }
                })
            } else {
                res.status(400).json({ erro: "Erro ao gerar código!" })
            }
        } else {
            res.status(405).json({ erro: "E-mail inválido!" })
        }
    } catch (error) {
        res.status(400).json(error)
    }
}

export const validateCode = async (req, res) => {
    const { id } = req.params
    const { email, code } = req.body

    if (!email || !code) {
        res.status(400).json({ "erro": "E-mail e código são obrigatórios!" })
        return
    }

    try {
        const responseCode = await prisma.code.findFirst({
            where: {
                code: code,
                email: email,
                deletedAt: null
            }
        })

        if (responseCode) {
            const currentTime = new Date();
            const codeCreationTime = new Date(responseCode.createdAt);
            const timeDifference = (currentTime.getTime() - codeCreationTime.getTime()) / (1000 * 60);

            if (timeDifference > 15) {
                res.status(400).json({ erro: "Código expirado!" })
                return;
            }

            const deletedCode = await prisma.code.delete({
                where: { id: Number(responseCode.id) }
            })
            if (deletedCode) {
                res.status(200).json({
                    data: {
                        msg: "Código validado!",
                        userId: id,
                        email: email
                    }
                })
            } else {
                res.status(400).json({ erro: "Erro ao deletar código!" })
            }
        } else {
            res.status(404).json({ erro: "Código inválido!" })
        }
    } catch (error) {
        res.status(400).json(error)
    }
}

export const changeUserPassword = async (req, res) => {
    const { id } = req.params
    const { email, password } = req.body

    if (!email || !password) {
        res.status(400).json({ erro: "Senha é obrigatória!" })
        return
    }

    const message = passwordVerify(password)
    if (message.length > 0) {
        res.status(400).json({ erro: message.join("-") })
        return
    }

    const hashedPassword = hashSync(password, 10)

    try {
        const user = await userClient.update({
            where: {
                id: Number(id),
                email: email
            },
            data: { password: hashedPassword }
        })
        if (user) {
            await prisma.log.create({
                data: {
                    description: "Senha alterada!",
                    userId: id
                }
            })
            res.status(200).json({ msg: "Senha alterada com sucesso!" })
        } else {
            res.status(400).json({ error: "Erro ao alterar a senha!" })
        }

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
        await prisma.log.create({
            data: {
                description: "Permissão alterada!",
                userId: id
            }
        })
        res.status(200).json({ data: user })
    } catch (error) {
        res.status(400).json(error)
    }
}