import { Injectable } from '@nestjs/common';
import { ConnectionService } from './connection/connection.service';
import SQL from 'sql-template-strings';
import egg from 'src/mockup/egg.json';

@Injectable()
export class AppService {
  constructor(private connectionService: ConnectionService) {}
  async getHello() {
    const data = egg;
    let filter = {
      erc721: [],
      erc1155: [],
      contractsInfo: [],
    };



    const newMap = data.contractsInfo.map(e => {
      const salesList = [];
      const yami = data[e.schema.toLowerCase()].forEach((ele:any) => {
        if(ele.address.toLowerCase() === e.address.toLowerCase()){
          salesList.push(ele);
        }
      })
      console.log(salesList)

      return {
        ...e,
        salesList
      }
    });

    newMap.forEach(e => {
      e.salesList.forEach(ele => {
        console.log(`🚀 Event:Mint => ${e.name} #${ele.tokenId} / Price: ${data.price}, Gas: ${data.gas} / ${e.address}`);
      })
    })
    return newMap


  }
}
