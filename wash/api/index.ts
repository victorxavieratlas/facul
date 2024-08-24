import express from 'express'
import cors from "cors"
const app = express()
const port = 3007

// import marcasRoutes from './routes/marcas'
// import vinhosRoutes from './routes/vinhos'
import usersRouter from './routes/users.router'
import loginRouter from './routes/login.router'
import profilesRoutes from './routes/profiles.router'
import ratingsRoutes from './routes/ratings'
import citiesRouter from './routes/cities'
import imagesRoutes from './routes/images'
import schedulesRoutes from './routes/schedules'
import workingHoursRoutes from './routes/hours'
import searchRouter from './routes/search.router'
import servicesRouter from './routes/services.router'
import { tokenVerify } from './middlewares/tokenVerify.middleware'

// app.use("/marcas", marcasRoutes)
// app.use("/vinhos", vinhosRoutes)

app
  .use(express.json())
  .use(cors())
  .use("/users", usersRouter)
  .use("/login", loginRouter)
  .use("/profiles", profilesRoutes)
  .use("/ratings", ratingsRoutes)
  .use("/cities", citiesRouter)
  .use("/images", imagesRoutes)
  .use("/schedules", schedulesRoutes)
  .use("/workingHours", workingHoursRoutes)
  .use("/search", searchRouter)
  .use("/services", servicesRouter)

  .get('/', (req, res) => {
    res.send('API is running')
  })

  .listen(port, () => {
    console.log(`Running in: ${port}`)
  })