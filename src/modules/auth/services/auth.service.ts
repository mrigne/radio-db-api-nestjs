import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from 'jsonwebtoken';
import { User } from '../../../entities/user/user.entity';
import { UserService } from '../../user/services/user.service';

@Injectable()
export class AuthService {
    constructor(private userService: UserService, private jwtService: JwtService) {
    }

    public async validateUser(username: string, password: string): Promise<Partial<User>> {
        const user = await this.userService.findUserByUsername(username);
        if (!user) {
            return null;
        }
        const isMatch = await bcrypt.compare(password, user.hashedPassword);
        if (!isMatch) {
            return null;
        }
        const { hashedPassword, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }

    public login(user: User): string {
        const payload: JwtPayload = {
            username: user.userName,
            sub: user.userId
        };
        return this.jwtService.sign(payload, {

        });
    }
}
