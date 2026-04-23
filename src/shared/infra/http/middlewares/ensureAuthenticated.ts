import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
  sub: string;
}

export function ensuereAuthenticated(req: Request, res: Response, next: NextFunction) {
  // 1. Tenta pegar o token do COOKIE primeiro, depois do HEADER
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

  // 2. Se nenhum dos dois existir, aí sim dá erro
  if (!token) {
    return res.status(401).json({ error: "Token is missing" });
  }

  try {
    // 3. Valida o token (seja vindo de cookie ou header)
    const { sub } = verify(token, process.env.JWT_SECRET as string) as IPayload;

    // 4. Injeta o ID no request
    (req as any).user_id = sub; 

    return next();
  } catch (error) {
    return res.status(401).json({ error: "Token invalid" });
  }
}