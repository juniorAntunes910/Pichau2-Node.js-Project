import { prisma } from '../../../shared/infra/prisma'

interface IProductDelete{
    id: string
}


export class DeleteproductService{
    async execute({id}: IProductDelete){
        const existUser = await prisma.product.findUnique({where: {id}});
        if(!existUser){
            throw new Error("Produto não existe")
        }
        const product = await prisma.product.delete({where: {id}})
        return product;
    }  
}