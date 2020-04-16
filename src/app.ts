import express from 'express';
import morgan from 'morgan';
import { createConnection } from 'typeorm';


export class Application{
    public express: express.Application

    public constructor(){
        this.express = express();
        this.middlewares();
        this.routes();
    }
    private middlewares(){
        this.express.use(express.json());
        this.express.use(express.urlencoded({extended: true}));
        this.express.use(morgan('dev'));
    }
    private routes(): void{
        this.express.use(require('./routes'));
    }
    setupDbAndServer = async () => {
        const conn = await createConnection();
    }

}

export default new Application().express.listen(3333);