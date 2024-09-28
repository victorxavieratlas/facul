import { PrismaClient } from "@prisma/client"

const profileClient = new PrismaClient().profile
const profileLocationClient = new PrismaClient().profileLocation

export const getAllProfiles = async (req, res) => {
    try {
        const allProfiles = await profileClient.findMany({
            include: {
                images: true,
                schedules: true,
                profileLocation: true,
                ratings: true,
                categories: true,
                plans: true,
            }
        })
        res.status(200).json({ data: allProfiles })
    } catch (error) {
        res.status(400).json(error)
    }
}

export const getProfileById = async (req, res) => {
    const { id } = req.params

    try {
        const profile = await profileClient.findUnique({
            where: { id: Number(id) },
            include: {
                images: true,
                states: true,
                profileLocation: true,
                schedules: true,
            }
        })
        console.log(profile)
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
                profileLocation: true,
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
                profileLocation: true,
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
                profileLocation: true,
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
        userId,
        name
    } = req.body

    try {
        const profile = await profileClient.create({
            data: {
                userId,
                name
            }
        })
        res.status(201).json({ data: profile })
    } catch (error) {
        res.status(400).json(error)
    }
}

export const createProfileComplete = async (req, res) => {
    const {
        userId,
        name,
        bio,
        phone,
        startDay,
        finalDay,
        openHour,
        closeHour,
        minPrice,
        maxPrice,
        totalPointsPlans,
        cityId,
        stateId,
        schedules,
        imageURL
    } = req.body;

    try {
        // Passo 1: Criar o profile sem a relação com city
        const profile = await profileClient.create({
            data: {
                userId,
                name,
                bio,
                phone,
                startDay,
                finalDay,
                openHour,
                closeHour,
                minPrice,
                maxPrice,
                totalPointsPlans,
                schedules: {
                    create: schedules.map(schedule => ({
                        day: schedule.day,
                        isWorkingDay: schedule.isWorkingDay,
                    }))
                },
                images: {
                    create: {
                        url: imageURL,
                        published: true
                    }
                }
            }
        });

        await profileLocationClient.create({
            data: {
                profileId: profile.id,
                cityId: Number(cityId),
                stateId: Number(stateId)
            }
        });

        res.status(201).json({ data: profile });
    } catch (error) {
        res.status(400).json({ error: "Erro ao criar o perfil", details: error });
    }
};


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
        openHour,
        closeHour,
        minPrice,
        maxPrice,
        cityId,
        stateId,
        imageURL
    } = req.body


    if (!bio || !phone || !startDay || !finalDay || !minPrice || !maxPrice || !cityId || !stateId || !imageURL) {
        return res.status(400).json({ error: "Todos os campos são obrigatórios!" })
    }

    console.log(req.body)
    try {
        const profile = await profileClient.update({
            where: { id: Number(id) },
            data: {
                bio,
                phone,
                startDay,
                finalDay,
                openHour,
                closeHour,
                minPrice,
                maxPrice,
                profileLocation: {
                    create: {
                        cityId: Number(cityId),
                        stateId: Number(stateId)
                    }
                },
                images: {
                    create: {
                        url: imageURL,
                        published: true
                    }
                },
            }
        })
        res.status(200).json(profile)
    } catch (error) {
        res.status(400).json(error)
    }
}

export const updateProfileEditDetails = async (req, res) => {
    const { id } = req.params
    const {
        bio,
        phone,
        startDay,
        finalDay,
        openHour,
        closeHour,
        minPrice,
        maxPrice,
        cityId,
        oldCityId,
        stateId,
        oldStateId,
        imageURL,
        imageId,
    } = req.body


    if (!bio || !phone || !startDay || !finalDay || !minPrice || !maxPrice || !cityId || !stateId || !imageURL) {
        return res.status(400).json({ error: "Todos os campos são obrigatórios!" })
    }

    console.log(req.body)
    try {
        const profile = await profileClient.update({
            where: { id: Number(id) },
            data: {
                bio,
                phone,
                startDay,
                finalDay,
                openHour,
                closeHour,
                minPrice,
                maxPrice,
                profileLocation: {
                    update: {
                        where: {
                            profileId_cityId_stateId: {
                                profileId: Number(id),
                                cityId: Number(oldCityId),
                                stateId: Number(oldStateId)
                            }
                        },
                        data: {
                            cityId: Number(cityId),
                            stateId: Number(stateId)
                        }

                    }
                },
                images: {
                    update: {
                        where: { id: Number(imageId) },
                        data: {
                            url: imageURL,
                            published: true
                        }
                    }
                },
            }
        })
        res.status(200).json(profile)
    } catch (error) {
        res.status(400).json(error)
    }
}

// export const updateProfileDetailsForm = async (req, res) => {
//     const { id } = req.params
//     const {
//         bio,
//         phone,
//         startDay,
//         finalDay,
//         openHour,
//         closeHour,
//         minPrice,
//         maxPrice,
//         cityId,
//         imageURL
//     } = req.body

//     console.log(req.body)

//     if (!bio || !phone || !startDay || !finalDay || !minPrice || !maxPrice || !cityId || !imageURL) {
//         return res.status(400).json({ error: "Todos os campos são obrigatórios!" })
//     }

//     // const existingImage = await imageClient.findFirst({
//     //     where: { profileId: Number(id) }
//     // })

//     // if (!existingImage) {
//     //     return res.status(404).json({ error: 'Imagem não encontrada' });
//     // }

//     // const existingCity = await cityClient.findFirst({
//     //     where: { B: Number(id) }
//     // })

//     // if (!existingCity) {
//     //     return res.status(404).json({ error: 'Cidade não encontrada' });
//     // }

//     try {
//         const profile = await profileClient.update({
//             where: { id: Number(id) },
//             data: {
//                 bio,
//                 phone,
//                 startDay,
//                 finalDay,
//                 openHour,
//                 closeHour,
//                 minPrice,
//                 maxPrice,
//                 cities: {
//                     update: {
//                         where: { id: Number(cityId) },
//                         data: {

//                         }
//                     }
//                 },
//                 images: {
//                     update: {
//                         where: { id: existingImage.id },
//                         data: {
//                             url: imageURL,
//                             published: true
//                         }
//                     }
//                 }
//             }
//         })
//         res.status(200).json()
//     } catch (error) {
//         res.status(400).json(error)
//     }
// }

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
