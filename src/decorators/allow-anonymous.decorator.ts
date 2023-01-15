import { SetMetadata } from '@nestjs/common';

export const IS_ALLOW_ANONYMOUS_KEY = 'isAllowAnonymous';
export const AllowAnonymous = () => SetMetadata(IS_ALLOW_ANONYMOUS_KEY, true);
