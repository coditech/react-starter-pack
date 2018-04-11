import Knex from 'knex'

const knex = Knex({
  client: 'sqlite3',
  connection: {
    filename: __dirname+`/news.sqlite`
  }, 
  migrations: {
    directory: __dirname + `/migrations`
  },
  seeds: {
    directory: __dirname + `/seeds`
  },
  useNullAsDefault: true
});

const items_per_page = 10


knex.migrate.latest()
  .then(() => knex.seed.run())
  .then(() => console.log('[ db: News ] ready'))
  .catch( err => {throw err})

const throwErrorIfNoItems = items=>{
  if(!items.length){
    throw new Error(`no items found`)
  }
  return items
}

export const page = ({num}) => 
  knex.select('*').from('posts').offset((num-1)*items_per_page).limit(items_per_page).then(throwErrorIfNoItems)

export const item = ({slug}) => knex.select('*').from('posts').where({slug}).limit(1).then(throwErrorIfNoItems)