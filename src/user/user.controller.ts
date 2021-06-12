import { Controller } from '@nestjs/common';
import { UserService } from './user.service';
import { EventPattern } from '@nestjs/microservices';
@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @EventPattern('mainBalanceChange')
  async handleMainBalanceChange(data: Record<string, unknown>) {
    console.log('mainBalanceChange');
    this.userService.mainBalanceChange(data);
  }
}
