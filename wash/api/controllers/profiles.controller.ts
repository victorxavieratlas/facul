import { PrismaClient } from "@prisma/client"

const profileClient = new PrismaClient().profile

export const getAllProfiles = async (req, res) => {
    try {
        const allProfiles = await profileClient.findMany()
        res.status(200).json({ data: allProfiles })
    } catch (error) {
        res.status(400).json(error)
    }
}

export const getProfileById = async (req, res) => {
    const { id } = req.params

    try {
        const profile = await profileClient.findUnique({
            where: { id: Number(id) }
        })
        res.status(200).json({ data: profile })
    } catch (error) {
        res.status(400).json(error)
    }
}

export const getListOfTotalPoints = async (req, res) => {
    try {
        const profiles = await profileClient.findMany({
            include: {
                images: true,
                schedules: true,
                cities: true,
                ratings: true,
                categories: true,
                plans: true,
            },
            orderBy: {
                totalPointsPlans: 'desc'
            }
        })
        res.status(200).json({ data: profiles })
    } catch (error) {
        res.status(400).json(error)
    }
}

export const getListOfMaxPrice = async (req, res) => {
    try {
        const profiles = await profileClient.findMany({
            include: {
                images: true,
                schedules: true,
                cities: true,
                ratings: true,
                categories: true,
                plans: true,
            },
            orderBy: {
                maxPrice: 'asc'
            }
        })
        res.status(200).json({ data: profiles })
    } catch (error) {
        res.status(400).json(error)
    }
}

export const getListOfMinPrice = async (req, res) => {
    try {
        const profiles = await profileClient.findMany({
            include: {
                images: true,
                schedules: true,
                cities: true,
                ratings: true,
                categories: true,
                plans: true,
            },
            orderBy: {
                minPrice: 'desc'
            }
        })
        res.status(200).json({ data: profiles })
    } catch (error) {
        res.status(400).json(error)
    }
}

export const createProfile = async (req, res) => {
    const {
        bio,
        phone,
        startDay,
        finalDay,
        minPrice,
        maxPrice,
        userId,
        totalPointsPlans
    } = req.body

    try {
        const profile = await profileClient.create({
            data: {
                bio,
                phone,
                startDay,
                finalDay,
                minPrice,
                maxPrice,
                userId,
                totalPointsPlans
            }
        })
        res.status(201).json({ data: profile })
    } catch (error) {
        res.status(400).json(error)
    }
}

export const deleteProfile = async (req, res) => {
    const { id } = req.params

    try {
        const profile = await profileClient.delete({
            where: { id: Number(id) }
        })
        res.status(200).json({ data: profile })
    } catch (error) {
        res.status(400).json(error)
    }
}

export const softDeleteProfile = async (req, res) => {
    const { id } = req.params
    const deletedAt = new Date()

    try {
        const profile = await profileClient.update({
            where: { id: Number(id) },
            data: { deletedAt }
        })
        res.status(200).json({ data: profile })
    } catch (error) {
        res.status(400).json(error)
    }
}

export const updateProfile = async (req, res) => {
    const { id } = req.params
    const {
        bio,
        phone,
        startDay,
        finalDay,
        minPrice,
        maxPrice
    } = req.body

    try {
        const profile = await profileClient.update({
            where: { id: Number(id) },
            data: {
                bio,
                phone,
                startDay,
                finalDay,
                minPrice,
                maxPrice
            }
        })
        res.status(200).json({ data: profile })
    } catch (error) {
        res.status(400).json(error)
    }
}

// export const getListOfMinPrice = async (req, res) => {
//     try {
//         const profiles = await profileClient.findMany({
//             include: {
//                 images: true,
//                 schedules: true,
//                 cities: true,
//                 ratings: true,
//                 categories: true,
//                 plans: true,
//             },
//             orderBy: {
//                 Incluir campos e fazer a conta de rating: 'desc'
//             }
//         })
//         res.status(200).json({ data: profiles })
//     } catch (error) {
//         res.status(400).json(error)
//     }
// }
