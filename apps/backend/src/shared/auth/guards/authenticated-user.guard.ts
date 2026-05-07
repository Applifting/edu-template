import { ExecutionContext, Injectable } from '@nestjs/common';
import {
  BetterAuth,
  InjectBetterAuth,
} from '../providers/better-auth.provider';
import { getSessionFromRequest } from '../utils/get-session-from-request';

@Injectable()
export class AuthenticatedUserGuard {
  constructor(@InjectBetterAuth private readonly betterAuth: BetterAuth) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const session = await getSessionFromRequest(request, this.betterAuth);

    if (!session) {
      return false;
    }

    request.session = session;
    return true;
  }
}
