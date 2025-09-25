import bcrypt from "bcrypt"


import {prisma} from '../../libs/prismadb'; // Adjust path as necessary
// import prisma from "../../../libs/prismadb";
import { NextResponse } from "next/server";
// import { json } from "stream/consumers";


export async function POST(
    request:Request
) 
  
    {

    try{
      const body = await request.json();
      const {
          email, 
          name,
          password
      } = body;
      if (!email || !name || !password) {
          // throw new Error("Invalid Credentials")
          return new NextResponse("Missing info", {status:400});
      }



      const hashedPassword = await bcrypt.hash(password, 12)
      
      const user = await prisma.user.create({
          data:{
              email, 
              name, 
              hashedPassword
          }
      })
      return NextResponse.json(user);
  } catch (error:any) {
    console.log(error, 'REGISTRATION_ERROR');
    return new NextResponse('Mayooooooooooooo', {status:500});
}
}













// import { NextResponse } from "next/server";
// import bcrypt from "bcrypt";
// // import { prisma } from "@/lib/prisma";
// import {prisma} from "../../libs/prismadb";

// export async function POST(request: Request) {
//   try {
//     const body = await request.json();
//     const { email, name, password } = body;

//     if (!email || !password) {
//       return NextResponse.json({ error: "Missing fields" }, { status: 400 });
//     }

//     const existing = await prisma.user.findUnique({ where: { email } });
//     if (existing) {
//       return NextResponse.json({ error: "User exists" }, { status: 409 });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);
//     const user = await prisma.user.create({
//       data: { email, name, hashedPassword }
//     });

//     return NextResponse.json({ user }, { status: 201 });
//   } catch (err) {
//     console.error(err);
//     return NextResponse.json({ error: "Server error" }, { status: 500 });
//   }
// }







// import bcrypt from "bcrypt";
// import prisma from '../../libs/prismadb'; // Adjust path as necessary
// import { NextResponse } from "next/server";

// export async function POST(request: Request) {
//   try {
//     const body = await request.json();
//     const { email, name, password } = body;

//     // Basic input validation: Check missing fields
//     if (!email || !name || !password) {
//       return new NextResponse("Missing information", { status: 400 });
//     }

//     // Check if user already exists (important to avoid duplicates)
//     const existingUser = await prisma.user.findUnique({
//       where: { email },
//     });

//     if (existingUser) {
//       return new NextResponse("User already exists", { status: 409 });
//     }

//     // Hash the password with bcrypt, 12 salt rounds (good security balance)
//     const hashedPassword = await bcrypt.hash(password, 12);

//     // Create user record in DB with hashed password
//     const user = await prisma.user.create({
//       data: {
//         email,
//         name,
//         hashedPassword,
//       },
//     });

//     // Return user data (excluding sensitive info) as JSON
//     return NextResponse.json({
//       id: user.id,
//       email: user.email,
//       name: user.name,
//     });
//   } catch (error: any) {
//     console.error(error, "REGISTRATION_ERROR");
//     return new NextResponse("Internal Server Error", { status: 500 });
//   }
// }
