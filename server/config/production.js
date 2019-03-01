module.exports = {
  user: {
    role: 'superAdmin',
    username: 'q',
    password: 'q',
    nickname: 'Essay',
    email: '951576941@qq.coms',
    motto: 'Never too old to learn'
  },
  jwt: {
    secret: 'essay',
    expiresIn: 1296000
  },
  mongodb: {
    host: '127.0.0.1',
    database: 'essay',
    port: 27017,
    username: '',
    password: ''
  },
  githubConfig: {
    githubClient: '',
    githubSecret: '',
    scope: 'user'
  },
  emailConfig: {
    user: '',
    pass: ''
  },
  app: {
    domain: 'https://fml233.xyz',
    baseApi: '/v1'
  }
}
