const initial_data = [
  {
    name: 'users',
    items: [
      {
        email: 'admin@admin.com',
        password: 'admin',
        nick: 'admin'
      }
    ]
  },
  {
    name: 'posts',
    items: [
      {
        title: 'My First Post',
        slug: 'my-first-post',
        body: 'This is your first post',
        user_id: 1
      }
    ]
  },
  {
    name: 'comments',
    items: [
      {
        body: 'This is my first comment',
        user_id: 1,
        post_id: 1
      }
    ]
  }
]

const seed = ( knex, Promise ) => {
  return Promise.all(initial_data.map(({ name, items }) => knex.batchInsert(name, items)))
}

exports.seed = seed