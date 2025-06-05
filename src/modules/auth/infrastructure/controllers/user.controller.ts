import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { UserService } from '@modules/auth/application/services/user.service';
import { JwtAuthGuard } from '@modules/auth/infrastructure/strategies/jwt.auth.guard';
import { GetUserByIdDto } from '@modules/auth/application/dtos/response/get-user-by-id.dto';

@Controller('api')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get('getuserbyid')
  async getUserById(@Req() req: Request): Promise<GetUserByIdDto> {
    const userId = (req as any).user.userId;
    return this.userService.getuserbyid(userId);
  }
}
