import { Request, Response } from 'express';
import { AutenticateUserService } from '../services/AuthenticateUserService';

export class AuthenticateUserController {
    async handle(req: Request, res: Response) {
        const { email, password } = req.body;

        const authenticateUserService = new AutenticateUserService();

        try {
            const { user, token } = await authenticateUserService.execute({
                email,
                password
            });

            // CONFIGURAÇÃO DO COOKIE (O Coração do Problema)
            res.cookie('token', token, {
                httpOnly: true,    // Impede que scripts acessem o token
                secure: false,     // Deixe FALSE enquanto estiver usando HTTP (localhost)
                sameSite: 'lax',   // Necessário para navegadores modernos em localhost
                maxAge: 86400000,  // 1 dia de validade
                path: '/'          // Torna o cookie visível em todas as rotas
            });

            // Retorna o usuário. O Navegador vai guardar o token sozinho pelo Header Set-Cookie
            return res.json({ user });

        } catch (err: any) {
            return res.status(400).json({ error: err.message });
        }
    }
}