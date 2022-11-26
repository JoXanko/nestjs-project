import { PassportSerializer } from '@nestjs/passport';
import { Inject } from '@nestjs/common';
import { UserService } from 'src/app/user/user/user.service';
import { User } from 'src/app/entities/user/user.entity';

export class SessionSerializer extends PassportSerializer {
  constructor(
    @Inject(UserService.name) private readonly userService: UserService,
  ) {
    super();
  }

  serializeUser(user: User, done: (err, user: User) => void) {
    done(null, user);
  }

  async deserializeUser(payload: User, done: (err, user: User) => void) {
    const user = await this.userService.findOne(payload.id);
    return user ? done(null, user) : done(null, null);
  }
}
