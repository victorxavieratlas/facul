import { PrismaClient } from '@prisma/client'
import fs from 'fs'
import path from 'path'

const prisma = new PrismaClient()

async function main() {
    const data = JSON.parse(fs.readFileSync(path.resolve(__dirname, './states_and_cities.json'), 'utf-8'))

    for (const stateId in data.states) {
        const state = await prisma.state.create({
            data: {
                id: parseInt(stateId),
                name: data.states[stateId],
            },
        })

        const cities = data.cities.filter(city => city.state_id === parseInt(stateId))

        for (const city of cities) {
            await prisma.city.create({
                data: {
                    id: city.id,
                    name: city.name,
                    stateId: state.id,
                },
            })
        }
    }
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })