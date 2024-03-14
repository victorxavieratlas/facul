import { Router } from 'express'

const router = Router();

const alunos = [
    {
        id: 1,
        nome: "Ana Santos",
        curso: "ADS"
    },
    {
        id: 2,
        nome: "Beatriz Silva",
        curso: "Linguas"
    },
]

router.get('/', (req, res) => {

    res.status(200).json(alunos);
})

router.post('/', (req, res) => {
    const { nome, curso } = req.body
    alunos.push(
        {
            id: alunos.length + 1,
            nome,
            curso
        }
    )
    res.status(201).json({msg: "Aluno inserido com sucesso.", id: alunos.length})
})

router.delete('/:id', (req, res) => {
    const id = req.params.id

    const index = alunos.findIndex((aluno) => aluno.id === Number(id))

    if(index === -1) {
        res.status(404).send("Aluno não encontrado")
    } else{
        alunos.splice(index, 1)
        res.status(204).send()
    }
})

export default router
