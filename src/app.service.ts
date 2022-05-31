import { Injectable } from '@nestjs/common';
import SQL from 'sql-template-strings';
import { ConnectionService } from './connection/connection.service';
import params from "./mockup/egg.json";
import salesData from "./mockup/fry.json";
import Bignumber from 'bignumber.js';
import {toCamelCase} from "./utils/model"
import { RowDataPacket } from 'mysql2';

@Injectable()
export class AppService {
  constructor(private connectionService: ConnectionService) {}
  async getHello() {
    const user = await this.connectionService.SQL(SQL`
    SELECT * FROM USERS WHERE id1 = 9999`);

    console.log(Object.keys(user)[0])

    return (user as RowDataPacket).length > 0 ? toCamelCase(user[0]) : {};

  }
}
