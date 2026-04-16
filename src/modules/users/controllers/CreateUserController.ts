import { Request, Response} from 'express'
import { CreateUserService } from '../services/CreateUserService'
import { z } from 'zod';
export class CreateUserController {
    
    async  handle (req: Request, res: Response) { // Chama REQ e RES
        
        const userSchema = z.object({
            name: z.string().min(3, "O nome precisa de pelo menos 3 caracteres"),
            email: z.string().email("Formato de email invalido"),
            password: z.string().min(6, "A senha deve conter no minimo 6 caracteres"),
            role: z.string().optional()
        })

        try{
        const { name, email, password, role} = userSchema.parse(req.body); // Coleta do Req 
        const service = new CreateUserService(); // instancia o service
        const user = await service.execute( { 
            name,
            email,
            password,
            role
        })
        return res.status(201).json(user);
        } catch(error) { // Tratar o erro da forma correta e utilizar o zod
            if(error instanceof Error){
                return res.status(400).json({error: error.message});
            }

            return res.status(400).json({error: "Internal Server Error"});
        }
    }
}