import express from 'express'
const app = express()
const port = 3007

// import marcasRoutes from './routes/marcas'
// import vinhosRoutes from './routes/vinhos'
import usersRoutes from './routes/users'
import profilesRoutes from './routes/profiles'

app.use(express.json())
// app.use("/marcas", marcasRoutes)
// app.use("/vinhos", vinhosRoutes)
app.use("/users", usersRoutes)
app.use("/profiles", profilesRoutes)

app.get('/', (req, res) => {
  res.send('API is running')
})

app.listen(port, () => {
  console.log(`Running in: ${port}`)
})