import { Injectable } from '@nestjs/common';
import { ConnectionService } from 'src/connection/connection.service';

@Injectable()
export class DiscordService {
    constructor(
        private connectionService: ConnectionService,
    ){}

};
