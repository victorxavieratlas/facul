import { Router } from "express"
import { filmeCreate, filmeDelete, filmeIndex, filmeShow, filmeUpdate } from "./controllers/filmeController.js"
import { clienteCreate, clienteIndex } from "./controllers/clienteController.js"
import { loginCliente } from "./controllers/loginController.js"

const router = Router()

router.get("/filmes", filmeIndex)
      .post("/filmes", filmeCreate)
      .put("/filmes/:id", filmeUpdate)
      .delete("/filmes/:id", filmeDelete)
      .get("/filmes/:id", filmeShow)

router.get("/clientes", clienteIndex)
      .post("/clientes", clienteCreate)
      
router.post("/login", loginCliente)

export default router