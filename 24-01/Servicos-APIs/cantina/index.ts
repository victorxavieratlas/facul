import express from 'express'
const app = express()
const port = 3000

import router from './routes/cantina'

app.use(express.json())
app.use("/cantina", router)


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})