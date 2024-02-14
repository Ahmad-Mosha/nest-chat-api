import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { LoggerService } from 'src/logger/logger.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
	private readonly logger = new LoggerService();

	use(request: Request, response: Response, next: NextFunction) {
		const { method, originalUrl } = request;
		const userAgent = request.get('user-agent') || '';

		response.on('close', () => {
			const { statusCode } = response;
			const loggerObject = {
				Request: `method: ${method} userAgent: ${userAgent} url: ${originalUrl}`,
				Response: `status: ${statusCode}`,
			};
			if (!request.isAuthenticated()) {
				this.logger.Log.info(JSON.stringify(loggerObject));
			}
		});

		next();
	}
}
