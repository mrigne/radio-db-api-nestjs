import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as fs from 'fs';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule,
        {
            // Specify your ssl certificates path here or just remove this bject to use http
            httpsOptions: {
                key: fs.readFileSync('/etc/ssl/private.key', 'utf8'),
                cert: fs.readFileSync('/etc/ssl/certs.crt', 'utf8')
            }
        }
    );
    app.enableCors({
        // replace host where your application served
        origin: [
            'https://yourwebapphost.com'
        ],
        exposedHeaders: [
            'Content-Disposition'
        ]
    });
    const config = new DocumentBuilder()
        .setTitle('Radio DB Api')
        .setDescription('Radio DB Api Swagger')
        .setVersion('1.0')
        .addTag('auth')
        .addTag('items')
        .addTag('containers')
        .addBearerAuth({
            type: 'http',
            name: 'bearer',
            description: 'Use token WITHOUT Bearer prefix here'
        })
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('swagger', app, document);
    // specify hostname and port where your api will be hosted
    await app.listen(3000, 'yourapihost.com');
}
bootstrap();
