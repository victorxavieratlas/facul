import express from 'express'
const app = express()
const port = 3007

// import marcasRoutes from './routes/marcas'
// import vinhosRoutes from './routes/vinhos'
import usersRouter from './routes/users.router'
import loginRouter from './routes/login.router'
import profilesRoutes from './routes/profiles.router'
import ratingsRoutes from './routes/ratings'
import imagesRoutes from './routes/images'
import schedulesRoutes from './routes/schedules'
import workingHoursRoutes from './routes/hours'

// app.use("/marcas", marcasRoutes)
// app.use("/vinhos", vinhosRoutes)

app
  .use(express.json())
  .use("/users", usersRouter)
  .use("/login", loginRouter)
  .use("/profiles", profilesRoutes)
  .use("/ratings", ratingsRoutes)
  .use("/images", imagesRoutes)
  .use("/schedules", schedulesRoutes)
  .use("/workingHours", workingHoursRoutes)

  .get('/', (req, res) => {
    res.send('API is running')
  })

  .listen(port, () => {
    console.log(`Running in: ${port}`)
  })