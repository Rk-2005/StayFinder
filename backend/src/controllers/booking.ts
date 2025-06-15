import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const booking = async (req: any, res: any) => {
  const { listingId, checkIn, checkOut } = req.body;
  console.log(req.body)
  const userId = req.userid;

  if (!listingId || !checkIn || !checkOut) {
    return res.status(400).json({ msg: "Missing required fields" });
  }

  try {
    const newBooking = await prisma.bookings.create({
      data: {
        userid: userId,
        listingId: parseInt(listingId),
        checkIn: new Date(checkIn),
        checkOut: new Date(checkOut),
      },
    });

    return res.status(201).json({ msg: "Booking Succes", booking: newBooking });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "falied", error });
  }
};

export const getBookings = async (req: any, res: any) => {
  const id = req.userid;
  try {
    const bookings = await prisma.bookings.findMany({
      where: {
        userid: id,
      },
      select:{
        listing:true
      }
    });
    return res.json({
      bookings,
    });
  } catch (e) {
    res.status(404).json({
      msg: e,
    });
  }
};

export const deleteBooking = async (req: any, res: any) => {
  const bookingId = parseInt(req.params.id);
  const userId = req.userid;
  try {
    await prisma.bookings.delete({
      where: { id: bookingId },
    });
    return res.status(200).json({ msg: "Booking deleted successfully" });
  } catch (e) {
    return res.status(404).json({
      msg: e,
    });
  }
};


export const getBookingById=async(req: any, res: any)=>{
   const bookingId = parseInt(req.params.id);
  const userId = req.userid; 

  try {
    const booking = await prisma.bookings.findUnique({
      where: { id: bookingId },
      include: {
        listing: true,
      },
    });
    return res.json({ booking }); 
  }catch(e){

    return res.status(500).json({ msg: "error", e });
  }
}