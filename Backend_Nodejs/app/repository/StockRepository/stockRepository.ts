import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

class stockrepository {


    async postStockDetails(stockdata: any) {

        let responsestock = await prisma.stock.createMany({
            data: stockdata
        });
        return responsestock;
    }


    async getStockDetails() {
        let responsestock = await prisma.stock.findMany({
            include: {
                order: true
            }
        });
        return responsestock;
    }

    async deletestock(stockid: any) {
        let responsestock = await prisma.stock.delete({
            where: { id: stockid },
        })
        return responsestock;
    }

}

export default new stockrepository();