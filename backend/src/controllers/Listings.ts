import { PrismaClient } from "@prisma/client";
import { Request } from "express";
import uploadOnCloud from "../config/cloudinary";

const prisma = new PrismaClient();

export const getall = async (req: Request, res: any) => {
  const results = await prisma.listings.findMany();
  console.log("hi");
  return res.json({
    results,
  });
};

export const getListingsbyid = async (req: Request, res: any) => {
  const params = parseInt(req.params.id);
  const GetallListings = await prisma.listings.findMany({
    where: {
      id: params,
    },
  });
  return res.json({
    GetallListings,
  });
};

export const Postlistings = async (req: any, res: any) => {
  const { title, description, location, price } = req.body;
  const id = req.userid;
  const image = await uploadOnCloud(req.file?.path);
  console.log(req.body);
  console.log(id);
  const check = await prisma.listings.findFirst({
    where: {
      title: title,
    },
  });
  if (check) {
    return res.status(404).json({
      msg: "Title already exits",
    });
  }
  const listings = await prisma.listings.create({
    data: {
      title: title,
      description: description,
      location: location,
      hostId: id,
      price: parseInt(price),
      image: image,
    },
  });
  res.json({
    listings,
  });
};

export const updateListings = async (req: any, res: any) => {
  const { title, description, location, price } = req.body;
  const id = req.userid;
  try {
    const listings = await prisma.listings.update({
      where: {
        id: id,
      },
      data: {
        title: title,
        description: description,
        location: location,
        hostId: id,
        price: price,
      },
    });

    res.json({
      listings,
    });
  } catch (e) {
    res.status(503).json({
      e,
    });
  }
};

export const deleteListings = async (req: any, res: any) => {
  const id = parseInt(req.params.id);
  try {
    await prisma.listings.delete({
      where: { id: id },
    });
    res.send("success");
  } catch (e) {
    res.status(503).send({
      e,
    });
  }
};

export const getListingsByAdmin = async (req: any, res: any) => {
  const hostId = req.userid;
  console.log(hostId + " admin id");
  try {
    const listings = await prisma.listings.findMany({
      where: {
        hostId: hostId,
      },
    });

    res.json({ listings });
  } catch (e) {
    console.error(e);
    res.status(503).json({
      msg: "Failed to load",
      error: e,
    });
  }
};

export const getdetails = async (req: any, res: any) => {
  const listid = parseInt(req.params.id);
  console.log(listid)
  
    const result = await prisma.bookings.findMany({
      where: {
        listingId: listid,
      },
      
      select: {
        checkIn:true,
        checkOut:true,
        user:{
          select:{
            name:true,
            email:true
          }
        },
        listing:true
      },
    });
    return res.json({
      result,
    });
  
};
