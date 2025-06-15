import e, { Request, Response } from "express";

import { SigninSchema, SignupSchema } from "../Validation";
import bcrypt, { hash } from "bcryptjs";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const JWT_SECRET = process.env.JWT_SECRET || "Ronak";

export const signup = async (req: Request, res: any) => {
  
  const data = req.body;
  console.log(data);
  try {
    const check = SignupSchema.safeParse(data);
    
    if (!check.success) {
      return res.status(504).json({
        Msg: "Invalid Inputs",
      });
    }
    const exits = await prisma.user.findUnique({
      where: { email: data.email },
    });
    
    if(exits){
      return res.status(404).json({
       msg:"User already exits"
      })
    }

    const hash = bcrypt.hashSync(data.password, 10);

    const user = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hash,
        role: data.role,
      },
    });
    
    
    const token = jwt.sign({ userid: user.id, role: data.role }, JWT_SECRET);

    res.json({
      token,
    });
  } catch (e) {
    res.status(503).json({
      e,
    });
  }
};

export const signin = async (req: Request, res: any) => {
  const body = req.body;
  console.log(body)
  try {
    const check = SigninSchema.safeParse(body);

    if (!check.success) {
      return res.status(503).json({
        msg: "Invalid Schema",
      });
    }

    const user = await prisma.user.findUnique({
      where: { email: body.email },
    });

    if (!user) {
      return res.json({
        msg: "User doesnt exists",
      });
    }

    const password = await bcrypt.compare(body.password, user.password);
    if (password == false) {
      return res.status(404).json({
        msg: "Invalid password or email",
      });
    }
    const token = jwt.sign({ userid: user.id, role: user.role }, JWT_SECRET);

    res.json({
      token,
    });
  } catch (e) {
    return res.json({
      e,
    });
  }
};
