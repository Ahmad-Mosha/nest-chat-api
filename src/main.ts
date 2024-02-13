import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as session from 'express-session';
import * as passport from 'passport';
import * as process from 'process';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.useGlobalPipes(new ValidationPipe());
	app.use(
		session({
			secret: process.env.SESSION_SECRET,
			resave: false,
			saveUninitialized: false,
			cookie: { maxAge: 60000 },
		}),
	);
	app.use(passport.initialize());
	app.use(passport.session());
	const config = new DocumentBuilder()
		.setTitle('Chat Api')
		.setDescription('NestJs Chat Api')
		.setVersion('1.0')
		.addTag('chat')
		.build();
	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('api', app, document);
	await app.listen(3000);
}
bootstrap();
