import { prisma } from "../../../shared/infra/prisma"

interface IOrderRequest{
    userId: string;
    productId: string;
    quantity: number
}