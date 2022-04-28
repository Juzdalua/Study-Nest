import { Injectable, OnModuleInit } from "@nestjs/common";
import mysql from "mysql2/promise";

@Injectable()
export class ConnectionService implements OnModuleInit {
    public CP:mysql.Pool ;
    constructor(){
        this.CP = mysql.createPool({
            host: process.env.MYSQL_HOST as string,
            user: process.env.MYSQL_USER as string,
            password: process.env.MYSQL_PASSWORD as string,
            port: parseInt(process.env.MYSQL_PORT as string) ?? 3306,
            database: process.env.MYSQL_DATABASE as string,
            connectionLimit: parseInt(process.env.MYSQL_CONNECTION_LIMIT as string) ?? 50
        });
    }      

    async onModuleInit() {
      
    };
}