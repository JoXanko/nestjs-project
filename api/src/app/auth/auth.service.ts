import { Inject, Injectable } from '@nestjs/common';
import { Request, Response } from 'express';
import { environment } from 'src/environment/environment';
import { compare } from '../bcrypt/bcrypt';
import { UserService } from '../user/user/user.service';
@Injectable()
export class AuthService {
  constructor(
    @Inject(UserService.name) private readonly userService: UserService,
  ) {}

  public logout(req: Request, res: Response): void {
    req.session.destroy(() => {
      req.logout(() => {
        res.clearCookie(environment.sessionName);
        res.status(204);
        res.send('');
      });
    });
    //console.log(req.session);
  }

  async validateUser(username: string, password: string) {
    const user = await this.userService.findOneByUsername(username);

    if (user && (await compare(password, user.password))) {
      return user;
    } else {
      return null;
    }
  }
}
