import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

class orderrepository {


    async postOrderDetails(orderdata: any) {
        let responseorder = await prisma.order.createMany({
            data: orderdata
        });
        return responseorder;
    }


    async getOrderDetails() {
        let responseorder = await prisma.order.findMany({
            include: {
                stock: true
            }
        });

        return responseorder;
    }

    async deleteorder(orderid: any) {
        let responseorder = await prisma.order.delete({
            where: { id: orderid },
        })
        return responseorder;
    }

}

export default new orderrepository();