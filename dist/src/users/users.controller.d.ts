import { UsersService } from './users.service';
import { UrlDto } from 'global.dto';
export declare class UsersController {
    private usersService;
    constructor(usersService: UsersService);
    newUser(params: UrlDto, newUserBodyDto: any, headers: any): Promise<void>;
}
