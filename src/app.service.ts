import { Injectable } from '@nestjs/common';
import { ConnectionService } from './connection/connection.service';

@Injectable()
export class AppService {
  constructor(    
    private connectionService: ConnectionService
    ){}
  async getHello() {
    
    const user = this.connectionService.CP.query("SELECT * FROM USERS");
    
    return user;
  };




}
