import express from 'express'
const app = express()
const port = 3007

// import marcasRoutes from './routes/marcas'
// import vinhosRoutes from './routes/vinhos'
import usersRouter from './routes/users.router'
import profilesRoutes from './routes/profiles.router'
import ratingsRoutes from './routes/ratings'
import imagesRoutes from './routes/images'
import schedulesRoutes from './routes/schedules'
import workingHoursRoutes from './routes/hours'

app.use(express.json())
// app.use("/marcas", marcasRoutes)
// app.use("/vinhos", vinhosRoutes)
app.use("/users", usersRouter)
app.use("/profiles", profilesRoutes)
app.use("/ratings", ratingsRoutes)
app.use("/images", imagesRoutes)
app.use("/schedules", schedulesRoutes)
app.use("/workingHours", workingHoursRoutes)

app.get('/', (req, res) => {
  res.send('API is running')
})

app.listen(port, () => {
  console.log(`Running in: ${port}`)
})