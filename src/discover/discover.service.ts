import { Injectable } from '@nestjs/common';
import { ConnectionService } from 'src/connection/connection.service';
import { CreateUpcomingDTO } from './dto/create-upcoming.dto';
import SQL from 'sql-template-strings';
import { toCamelCase } from 'src/utils/model';
import commonResponse from 'src/utils/commonResponse';

@Injectable()
export class DiscoverService {
    constructor(private readonly connectionService: ConnectionService){}

    async postUpcomingData(body:CreateUpcomingDTO, file:any){

        try {
            const query = await this.connectionService.SQL(SQL`
            INSERT INTO UPCOMING (COLLECTION_NAME, DUE_DATE, WEBSITE_URL, IMAGE_URL, MINT_PRICE, NETWORK)
            VALUES (${body.COLLECTION_NAME}, ${body.DUE_DATE}, ${body.WEBSITE_URL}, ${file.location}, ${body.MINT_PRICE}, ${body.NETWORK})`);

            const result = await this.connectionService.SQL(SQL`
            SELECT * FROM UPCOMING WHERE COLLECTION_NAME = ${body.COLLECTION_NAME};
            `);
            return commonResponse.success(toCamelCase(result[0]));
        } catch (error) {
            console.log(error);
            return undefined;
        }
    };

}
