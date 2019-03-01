let config
if (process.env.NODE_ENV === 'development') {
  config = require('./development')
} else {
  config = require('./production')
}
let isDocker = process.env.IS_DOCKER
if (isDocker) {
  config.mongodb.host = 'mongo'
}

module.exports = config
