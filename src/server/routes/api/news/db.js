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

export const get_page = (num) => knex.select('*').from('posts').offset((num-1)*items_per_page).limit(items_per_page)

export const get_news_item = (slug) => knex.select('*').from('posts').where({slug:'slug'}).limit(1)