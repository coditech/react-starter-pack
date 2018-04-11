import { Router } from 'express'
import * as db from './db'

const app = new Router()

const Ok = ( res ) => ( data ) => res.send({ status:'ok', data })
const No = ( res ) => ( error ) => res.status(404).send({ status:'error', data:null, error:error.message })



app.get('/item/:slug', ( req, res ) => db.item(req.params).then(Ok(res)).catch(No(res)) )

app.get('/page/:num?', ( req, res ) => db.page(req.params).then(Ok(res)).catch(No(res)) )

app.get('/', (req,res)=>Ok(res)({message:'news api is working'}))

export default app