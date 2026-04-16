import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
  sub: string;
}

export function ensuereAuthenticated(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization; // Recebe o token

  if (!authHeader) {
    return res.status(401).json({ error: "Token is missing" });
  }
//Separa eles 
  const [, token] = authHeader.split(" ");

  try {
    const { sub } = verify(token, process.env.JWT_SECRET as string) as IPayload;

    // Se o erro continuar aqui no terminal, use o Plano B abaixo:
    (req as any).user_id = sub; 

    return next();
  } catch (error) {
    return res.status(401).json({ error: "Token invalid" });
  }
}