import { PrismaClient } from "@prisma/client";

const prisma=new PrismaClient();

export const bulk=async(req:any,res:any)=>{
  
    const filter=req.params.filter || "";
    console.log(filter)
    console.log(filter+"hi")
    const results=await prisma.listings.findMany({
        where:{
            title:{
                contains:filter,
                mode:"insensitive"
            }
        }
    })
    res.json({
        results
    })
}