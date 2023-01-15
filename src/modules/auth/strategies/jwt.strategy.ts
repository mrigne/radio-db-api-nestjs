import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { JwtPayload } from 'jsonwebtoken';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JWT_AUDIENCE, JWT_ISSUER, JWT_SECRET_KEY } from '../../../constants/jwt.constant';
import { User } from '../../../entities/user/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: JWT_SECRET_KEY,
            issuer: JWT_ISSUER,
            audience: JWT_AUDIENCE
        });
    }

    async validate(payload: JwtPayload): Promise<Partial<User>> {
        return { userId: payload.sub, userName: payload.username };
    }
}
