import { Injectable, OnModuleInit } from "@nestjs/common";
import mysql, { OkPacket, ResultSetHeader, RowDataPacket } from "mysql2";
import connectionPool from "mysql2/promise";
import { SQLStatement } from "sql-template-strings";

@Injectable()
export class ConnectionService implements OnModuleInit {
    public POOL: connectionPool.Pool;
    public CP;

    constructor(){
        this.POOL = connectionPool.createPool({
            host: process.env.MYSQL_HOST as string,
            user: process.env.MYSQL_USER as string,
            password: process.env.MYSQL_PASSWORD as string,
            port: parseInt(process.env.MYSQL_PORT as string) ?? 3306,
            database: process.env.MYSQL_DATABASE as string,
            connectionLimit: parseInt(process.env.MYSQL_CONNECTION_LIMIT as string) ?? 50
        });

        this.CP = mysql.createPool({
            host: process.env.MYSQL_HOST as string,
            user: process.env.MYSQL_USER as string,
            password: process.env.MYSQL_PASSWORD as string,
            port: parseInt(process.env.MYSQL_PORT as string) ?? 3306,
            database: process.env.MYSQL_DATABASE as string,
            connectionLimit: parseInt(process.env.MYSQL_CONNECTION_LIMIT as string) ?? 50
        })
    }

    async onModuleInit() {
        console.log(`✅ START CONNECTION 🚀 `)
    };

    async query(rawQuery: string, params: any[]): Promise<RowDataPacket[][] | RowDataPacket[] | OkPacket | OkPacket[] | ResultSetHeader> {
        const [results, fields] = await this.POOL.query(rawQuery, params);
        return results;
    }

    async SQL(...args: any): Promise<RowDataPacket[][] | RowDataPacket[] | OkPacket | OkPacket[] | ResultSetHeader> {
        let data = [];
        if( typeof args[0] === 'string' && args[1] instanceof Array )
            data = await this.POOL.query(args[0], args[1]);
        else if ( args[0] instanceof SQLStatement && args[1] instanceof Array )
            data = await this.POOL.query(args[0], args[1]);
        else if ( args[0] instanceof SQLStatement && args[1] === undefined )
            data = await this.POOL.query(args[0]);

        // data = [results, fields]
        return data[0];
    }
}