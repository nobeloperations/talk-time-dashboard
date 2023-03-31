import { UsersService } from './users.service';
import { UrlDto } from 'global.dto';
import { CreateUserDto } from './dtos/create-user.dto';
export declare class UsersController {
    private usersService;
    constructor(usersService: UsersService);
    newUser(params: CreateUserDto, newUserBodyDto: any, headers: any): Promise<void>;
    getUsers(params: UrlDto): Promise<{
        cssFileName: string;
        users: any[];
        url: any;
        date: any;
    }>;
    updateStatus(updateStatusBodyDto: any): Promise<void>;
    getStatuses(params: any): Promise<string>;
}
