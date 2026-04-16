import { Request, Response } from 'express';
import { AutenticateUserService  } from '../services/AuthenticateUserService';

export class AuthenticateUserController {
    async handle(req: Request, res: Response){
        const { email, password} = req.body;
        const service = new AutenticateUserService();

        try{
            const token = await service.execute({
                email, 
                password
            });
            return res.json(token);
        } catch( error){
            if(error instanceof Error){
                return res.status(400).json({error: error.message});
            }
            return res.status(400).json({error: "Internal Server Error"});
        }
    }
}