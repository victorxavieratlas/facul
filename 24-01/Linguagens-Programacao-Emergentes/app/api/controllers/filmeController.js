// import { Op } from "sequelize"
import { Filme } from "../models/Filme.js"

export async function filmeIndex(req, res) {
  try {
    const filmes = await Filme.findAll()
    res.status(200).json(filmes)
  } catch (error) {
    res.status(400).send(error)
  }
}

export async function filmeCreate(req, res) {
  const { titulo, genero, duracao, preco, foto, sinopse } = req.body

  if (!titulo || !genero || !duracao || !preco || !foto || !sinopse) {
    res.status(400).json("Erro... Informe titulo, genero, duracao, preco, foto, sinopse")
    return
  }

  try {
    const filme = await Filme.create({
      titulo, genero, duracao, preco, foto, sinopse
    })
    res.status(201).json(filme)
  } catch (error) {
    res.status(400).send(error)
  }
}

export async function filmeUpdate(req, res) {

  const { id } = req.params

  const { titulo, genero, duracao, preco, foto, sinopse } = req.body

  if (!titulo || !genero || !duracao || !preco || !foto || !sinopse) {
    res.status(400).json("Erro... Informe titulo, genero, duracao, preco, foto, sinopse")
    return
  }

  try {
    const filme = await Filme.update({
      titulo, genero, duracao, preco, foto, sinopse
    },
      {
        where: { id }
      })
    res.status(200).json(filme)
  } catch (error) {
    res.status(400).send(error)
  }
}

export async function filmeDelete(req, res) {

  const { id } = req.params

  try {
    await Filme.destroy({
      where: { id }
    })

    res.status(200).json({ msg: "Ok! Filme removido com sucesso" })
  } catch (error) {
    res.status(400).send(error)
  }
}

export async function carroOrdemAno(req, res) {
  try {
    const carros = await Carro.findAll({
      order: [
        ["ano", "DESC"]
      ]
    })
    res.status(200).json(carros)
  } catch (error) {
    res.status(400).send(error)
  }
}

export async function carroFiltroModeloMarca(req, res) {

  const { palavra } = req.params

  try {
    const carros = await Carro.findAll({
      where: {
        [Op.or]: [{
          modelo: {
            [Op.like]: `%${palavra}%`
          }
        },
        {
          marca: {
            [Op.like]: `%${palavra}%`
          }
        }]
      }
    })
    res.status(200).json(carros)
  } catch (error) {
    res.status(400).send(error)
  }
}

export async function carroFiltroPreco(req, res) {

  const { preco1, preco2 } = req.params

  try {
    const carros = await Carro.findAll({
      where: {
        preco: {
          [Op.between]: [preco1, preco2]
        }
      }
    })
    res.status(200).json(carros)
  } catch (error) {
    res.status(400).send(error)
  }
}

export async function carroGruposMarca(req, res) {
  try {
    const carros = await Carro.count({
      group: 'marca',
      attributes: [
        'marca',
      ]
    })
    res.status(200).json(carros)
  } catch (error) {
    res.status(400).send(error)
  }
}

export async function carroTotais(req, res) {
  try {
    const numero = await Carro.count()
    const soma = await Carro.sum('preco')
    const media = soma / numero
    const destaque = await Carro.max('preco')
    const carro_destaque = await Carro.findOne({
      where: { preco: destaque }
    })
    res.status(200).json({ numero, soma, media, destaque, carro_destaque })
  } catch (error) {
    res.status(400).send(error)
  }
}