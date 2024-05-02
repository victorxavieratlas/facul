import { Router } from "express"
import { filmeCreate, filmeDelete, filmeIndex, filmePesquisa, filmeShow, filmeUpdate } from "./controllers/filmeController.js"
import { clienteCreate, clienteIndex } from "./controllers/clienteController.js"
import { loginCliente } from "./controllers/loginController.js"
import { avaliacaoCreate, avaliacaoDestroy, avaliacaoFilme, avaliacaoIndex } from "./controllers/avaliacaoController.js"

const router = Router()

router.get("/filmes", filmeIndex)
      .post("/filmes", filmeCreate)
      .put("/filmes/:id", filmeUpdate)
      .delete("/filmes/:id", filmeDelete)
      .get("/filmes/:id", filmeShow)
      .get("/filmes/pesquisa/:palavra", filmePesquisa)

router.get("/clientes", clienteIndex)
      .post("/clientes", clienteCreate)
      
router.post("/login", loginCliente)

router.get('/avaliacoes', avaliacaoIndex)
      .post('/avaliacoes', avaliacaoCreate)
      .delete('/avaliacoes/:id', avaliacaoDestroy)
      .get('/avaliacoes/filme/:id', avaliacaoFilme)

export default router