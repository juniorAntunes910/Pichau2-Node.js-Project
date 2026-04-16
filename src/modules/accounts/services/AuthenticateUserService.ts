import { prisma } from '../../../shared/infra/prisma'
import { compare } from 'bcrypt' //Ferramenta para "descriptografar" a comparação
import { sign } from 'jsonwebtoken' //Ferramenta que assina e cria o "crachá" (Token)

interface IRequest {
    email: string; 
    password: string;
}

export class AutenticateUserService {
    async execute({ email, password}: IRequest){

        //Verificar se o user existe em nosso banco de dados 
        const user = await prisma.user.findUnique({where: {email}});
        if(!user){
            throw new Error("Usuário não existe em nosso banco de dados")
        }
        //Verificação de Senha pra ver se ele acertou 
        const passwordMath = await compare(password, user.password); // Assim ele compara aquele hash do bd com a senha 

        if(!password){
            throw new Error("Senha do Usuário esta incorreta")
        }
        
        //Emissão do jwt 
        const token = sign(
            {
                role: user.role, // Guardando o cargo/role dele no token
                name: user.name // Guarda o nome pra facilitar no front 
            },
            process.env.JWT_SECRET as string,
            {
                subject: user.id,
                expiresIn: '1d'
            }
        );

        return {
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role
            },
            token
        };

    }
}