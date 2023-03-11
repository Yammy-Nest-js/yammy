import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
//업로드
@Injectable()
export class LocalAuthenticationGuard extends AuthGuard('local') {}
