import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import logger from 'morgan';
import Config  from "./config";
import DatabaseService from './scripts/database';

export default class ExpressRouter {
    constructor() {
        this.app = express();

        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended: false}));

        if(Config.isProd) {
            this.app.use(cors( { origin: 'http://telemetry.calgarysolarcar.ca' } ));
        }
        else {
            this.app.use(cors( { origin: 'http://localhost:4200' } ));
        }
        
        this.app.use(logger('combined'));
    }

    app: Express;

    public setRoutes(db: DatabaseService): void {
        this.app.get('/', (req: Request, res: Response) => res.send(''))

        this.app.use('/api/test', (req: Request, res: Response) => {
            res.send( {
                test: 'test call works!'
            });
        });

        this.app.use('/api/getPackets', (req: Request, res: Response) => {
            db.between(Number(req.query.startTime), Number(req.query.endTime),
                Number(req.query.page), Number(req.query.pageSize)).then(function(result) {
                res.send(result)
            }).catch((err) => {
                console.log(err);
                res.send('error')
            })
        });

        this.app.use('/api/lastPacket', (req: Request, res: Response) => {
            // API code will be here
            db.lastPacket().then(function(result) {
                res.send(result[0])
            }).catch((err) => {
                console.log(err);
                res.send('error')
            })
        });

        // catch 404 and forward to error handle
        this.app.use(function(req: Request, res: Response, next) {
            const err = new Error('Not Found');
            // err.status = 404;
            next(err);
        });

        // error handler
        this.app.use(function(err: Error, req: Request, res: Response) {
            // set locals, only providing error in development
            res.locals.message = err.message;
            res.locals.error = req.app.get('env') === 'development' ? err : {};

            // render the error page
            //res.status(err.status || 500);
            res.render('error');
        });

        this.app.listen(3000, function() {
            console.log('Express server listening on port 3000');
        });
    }
}

