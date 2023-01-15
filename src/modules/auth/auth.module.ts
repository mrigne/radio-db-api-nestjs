import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JWT_AUDIENCE, JWT_ISSUER, JWT_SECRET_KEY } from '../../constants/jwt.constant';
import { UserModule } from '../user/user.module';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
    imports: [
        UserModule,
        JwtModule.register({
            signOptions: {
                expiresIn: '1d',
                issuer: JWT_ISSUER,
                audience: JWT_AUDIENCE
            },
            secret: JWT_SECRET_KEY,
            verifyOptions: {
                issuer: JWT_ISSUER,
                audience: JWT_AUDIENCE
            }
        })
    ],
    controllers: [AuthController],
    providers: [AuthService, LocalStrategy, JwtStrategy],
    exports: [AuthService]
})
export class AuthModule {
}
