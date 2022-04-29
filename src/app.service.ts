import { Injectable } from '@nestjs/common';
import { ConnectionService } from './connection/connection.service';

@Injectable()
export class AppService {
  constructor(
    private connectionService: ConnectionService
    ){}
  async getHello() {

    // const arr = [1,2,3,4,5];
    // const num = 3;
    // const a = arr[0];

    // arr.forEach(e => {
    //   if(e === num){
    //     console.log("break; ",e)
    //     return false;
    //   } else{
    //     console.log("oh~ ",e)
    //   }
    // })

    // for(let i=0; i<arr.length; i++){
    //   if(arr[i] === num){
    //     console.log(i, arr[i]);
    //     return {
    //       i: arr[i]
    //     }
    //   }
    // }

    // const a = this.connectionService.CP.query("SELECT * FROM USERS", [], (err, results, fields) => {
    //   if(err)
    //     throw err;
    //   return results
    // }).then(response => console.log(response));


    const a = await this.connectionService.query("SELECT * FROM USERS LIMIT 1;", []);
    return a;


    const [user, field] = await this.connectionService.POOL.query("SELECT * FROM USERS WHERE name = ? ORDER BY id DESC LIMIT 1;", ['jun']);
    return user;
  };


}
