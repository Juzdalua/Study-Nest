import { Injectable } from '@nestjs/common';
import { ConnectionService } from 'src/connection/connection.service';

@Injectable()
export class UploadService {
    constructor(readonly connectionService: ConnectionService){}

    async postImages(body: any, file: any){
        return {
            body,
            file
        };
    }
}
