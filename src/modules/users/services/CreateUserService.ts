import { prisma } from '../../../shared/infra/prisma'
import bcrypt from 'bcryptjs' //Serve para criptografia de senhas

interface IUserRequest {
    name: string,
    email: string,
    password: string
    role?: string
}

export class CreateUserService {
    constructor() {
        
    }
    async execute( {name, email, password, role}: IUserRequest) {
        //Verificação de duplicidade de emails 
        const userExists = await prisma.user.findUnique({ // Procura um email exatamente igual no banco de dados, se estiver cria o userExists
            where: { email } // Foi usado o await pois assim o codigo só continua se o banco de dados devolver a informação que foi pedida
        });

        if(userExists){
            throw new Error("Este e-mail ja foi cadastrado no sistema!")
        }

        //Criptografia de Senha 
        const hashedPassword = await bcrypt.hash(password, 8) // Desta forma sera enviada uma senha criptografada para o banco de dados
        //Esse 8 quer dizer que ele vai embaralhar a senha 8 vezes seguidas chamado de 'salt/fator de custo'

        const user = await prisma.user.create({
            data: {
                name, 
                email,
                password: hashedPassword,
                role: role || "USER"
                // O role vai ser o padrão User que foi configurado no Schema.prisma
            },
        });
        return user
    }   
}