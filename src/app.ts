import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
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
        this.express.use(cors());
    }
    private routes(): void{
        this.express.use(require('./routes'));
    }
    setupDbAndServer = async () => {
         try{
            await createConnection();
                
        }
        catch(err){
            console.log(err)
        }
    }

}

export default new Application().express.listen( process.env.PORT || 3333);