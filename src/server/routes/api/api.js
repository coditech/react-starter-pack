import news from './news/api'
import { Router } from 'express'

const app = new Router()


app.use('/news',news)
app.use('/', (req, res) => res.send({status:'ok',data:{message:'api is working'}}))

export default app