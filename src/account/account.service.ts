import { Injectable } from '@nestjs/common';
import SQL from 'sql-template-strings';
import { ConnectionService } from 'src/connection/connection.service';

@Injectable()
export class AccountService {
    constructor(
        private connectionService: ConnectionService,
        ){}

    async findOneAdmin(username:string){
        const user = await this.connectionService.SQL(SQL`
        SELECT * FROM USERS WHERE name = ${username}`);

        return user[0] ?? undefined;
    }
}
