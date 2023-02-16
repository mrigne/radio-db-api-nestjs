import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AllowAnonymous } from '../../../decorators/allow-anonymous.decorator';
import { LocalAuthGuard } from '../../../guards/local-auth/local-auth.guard';
import { LoginDto } from '../dto/login.dto';
import { IResponseWithToken } from '../interfaces/auth.interface';
import { AuthService } from '../services/auth.service';

@ApiTags('auth')
@Controller()
export class AuthController {
    constructor(private authService: AuthService) {
    }

    @UseGuards(LocalAuthGuard)
    @AllowAnonymous()
    @Post('login')
    public login(@Request() req, @Body() loginDto: LoginDto): IResponseWithToken {
        return {
            token: this.authService.login(req.user)
        };
    }

    @Post('refresh')
    public refresh(@Request() req): IResponseWithToken {
        return {
            token: this.authService.login(req.user)
        };
    }
}
