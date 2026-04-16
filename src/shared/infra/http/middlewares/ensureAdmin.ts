import { Request, Response, NextFunction } from "express";
import { prisma } from "../../prisma"

export async function ensureAdmin(req: Request, res: Response, next: NextFunction){
    const { user_id } = req as any;

    const user = await prisma.user.findUnique({where: {id: user_id}});

    if(!user){
        return res.status(401).json({error: "User not found"});
    }

    if(user.role !== "ADMIN"){
        return res.status(403).json({error: "User is not authorized (admin only)"});
    }

    return next();
}