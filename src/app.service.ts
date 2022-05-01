import { Injectable } from '@nestjs/common';
import { ConnectionService } from './connection/connection.service';
import SQL from 'sql-template-strings';

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


    const a = await this.connectionService.SQL("SELECT * FROM USERS WHERE id = ? LIMIT 1;", [1]);
    const b = await this.connectionService.SQL(SQL`SELECT * FROM USERS WHERE id = ${1} LIMIT 1;`);
    const c = await this.connectionService.SQL(SQL`SELECT * FROM USERS WHERE id = ? LIMIT 1;`, [1]);

    return c;


    const [user, field] = await this.connectionService.POOL.query("SELECT * FROM USERS WHERE name = ? ORDER BY id DESC LIMIT 1;", ['jun']);
    return user;
  };


}
