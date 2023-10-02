export const environment = {
  production: false,
  password: 'redisSecret',
  sessionName: 'redis',
  port: 3000,
  redisHost: 'redis',//bez docker-compose localhost, sa docker-compose ide redis
  redisPort: 6379,
  dbHost: 'host.docker.internal',//bez docker-compose localhost, sa dc host.docker.internal
  corsOrigin: 'http://localhost:3000',
};
