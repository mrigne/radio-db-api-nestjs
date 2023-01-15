import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { IS_ALLOW_ANONYMOUS_KEY } from '../../decorators/allow-anonymous.decorator';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    constructor(private reflector: Reflector) {
        super();
    }

    canActivate(context: ExecutionContext) {
        const isAllowAnonymous = this.reflector.getAllAndOverride<boolean>(IS_ALLOW_ANONYMOUS_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (isAllowAnonymous) {
            return true;
        }
        return super.canActivate(context);
    }
}
