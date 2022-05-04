import { Injectable } from '@nestjs/common';
import { ConnectionService } from 'src/connection/connection.service';
import { CreateUpcomingDTO } from './dto/create-upcoming.dto';
import SQL from 'sql-template-strings';
import { toCamelCase } from 'src/utils/model';
import commonResponse from 'src/utils/commonResponse';
import { CreateTopbannerDTO } from './dto/create-topbanner.dto';

@Injectable()
export class DiscoverService {
    constructor(private readonly connectionService: ConnectionService){}

    async postTopbannerData(body: CreateTopbannerDTO){
        try {
            const query = await this.connectionService.SQL(SQL`
            INSERT INTO TOP_BANNER (TITLE, DESCRIPTION, IMAGE_URL, VIDEO_URL, BTNS, STYLES, PRIORITY)
            VALUES (${body.title}, ${body.description}, ${body.imageUrl}, ${body.videoUrl},
            ${JSON.stringify({
                "btn1": {
                    "link": `/collection/${body.contractAddress}`,
                    "title": "View Collection"
                }
            })},
            ${JSON.stringify({
                "cover": {
                    "endColor": "transparent",
                    "startColor": "#18056c"
                }
            })},
            ${body.priority})`);

            const result = await this.connectionService.SQL(SQL`
            SELECT * FROM TOP_BANNER WHERE TITLE = ${body.title};
            `);
            return commonResponse.success(toCamelCase(result[0]));
        } catch (error) {
            console.log(error);
            return undefined;
        }
    }

    async postUpcomingData(body:CreateUpcomingDTO, files:any){

        try {
            const query = await this.connectionService.SQL(SQL`
            INSERT INTO UPCOMING (COLLECTION_NAME, DUE_DATE, WEBSITE_URL, IMAGE_URL, MINT_PRICE, NETWORK)
            VALUES (${body.collectionName}, ${body.dueDate}, ${body.websiteUrl}, ${files && files.cover.length > 0 ? files.cover[0].location : null}, ${body.mintPrice}, ${body.network})`);

            const result = await this.connectionService.SQL(SQL`
            SELECT * FROM UPCOMING WHERE COLLECTION_NAME = ${body.collectionName};
            `);
            return commonResponse.success(toCamelCase(result[0]));
        } catch (error) {
            console.log(error);
            return undefined;
        }
    };

}
