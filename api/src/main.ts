import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import * as bodyParser from 'body-parser';
import { config } from 'dotenv';
import * as connectRedis from 'connect-redis';
import { ConfigService } from '@nestjs/config';
import * as session from 'express-session';
import { createClient } from 'redis';
import { environment } from './environment/environment';
import * as passport from 'passport';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //app.enableCors(); //treba il ne?
  app.enableCors({
    allowedHeaders: '*',
    origin: '*',
    credentials: true,
  });

  const swaggerConfig = new DocumentBuilder()
    .setTitle('ITutor example')
    .setDescription('The ITutor API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(new ValidationPipe());

  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

  config();
  const configService = app.get(ConfigService);

  const RedisStore = connectRedis(session);
  const redisClient = createClient({
    socket: {
      host: environment.redisHost,
      port: environment.redisPort,
    },
    legacyMode: true,
  });

  redisClient.on('error', (err) =>
    Logger.error(
      'Could not establish a connection with redis. ' + err,
      'Redis',
    ),
  );
  redisClient.on('connect', () =>
    Logger.log('Connected to redis successfully', 'Redis'),
  );

  await redisClient.connect();

  app.use(
    session({
      store: new RedisStore({ client: redisClient }),
      name: environment.sessionName,
      secret: 'redisSecret',
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24,
      },
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());

  await app.listen(3000);
}
bootstrap();
