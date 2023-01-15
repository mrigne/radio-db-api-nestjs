import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtAuthGuard } from './guards/jwt-auth/jwt-auth.guard';
import { AuthModule } from './modules/auth/auth.module';
import { ContainerModule } from './modules/container/container.module';
import { ItemModule } from './modules/item/item.module';
import { UserModule } from './modules/user/user.module';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'mssql',
            host: 'yourdatabasehost',
            port: 1433,
            username: 'sa',
            password: 'yaourdatabasepassword',
            database: 'RadioDB',
            autoLoadEntities: true,
            extra: {
                trustServerCertificate: true
            }
        }),
        AuthModule,
        UserModule,
        ItemModule,
        ContainerModule
    ],
    providers: [
        {
            provide: APP_GUARD,
            useClass: JwtAuthGuard
        }
    ]
})
export class AppModule {
}
