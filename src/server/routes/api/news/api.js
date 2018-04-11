import { Router } from 'express'
import * as db from './db'

const app = new Router()

const Ok = ( res ) => ( data ) => res.send({ status:'ok', data })
const No = ( res ) => ( error ) => res.status(500).send({ status:'error', data:null, error:error.message })


app.get('/:page?', ( req, res ) => db.get_page(req.params.page).then(Ok(res)).catch(No(res)) )

app.get('/item/:slug', ( req, res ) => db.get_news_item(req.params.slug).then(Ok(res)).catch(No(res)) )

app.get('/', (req,res)=>Ok(res)({message:'news api is working'}))

export default app