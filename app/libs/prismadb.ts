// // import { PrismaClient } from './../../node_modules/@prisma/client/generator-build/index';
// import { PrismaClient } from "@prisma/client";

// declare global {
//     var prisma: PrismaClient | undefined;
// }

// import { PrismaClient } from '../generated/prisma'

// const client = globalThis.prisma  || new PrismaClient();
// if(process.env.NODE_ENV != 'production') globalThis.prisma = client
// // if (process.env.NODE_ENV === 'development') globalThis.prisma = client;

// // ≠

// export default client;




// import { PrismaClient } from "@prisma/client";
// import {PrismaClient} from '../generated/prisma';


// const prisma = new PrismaClient();

// export default prisma;



// import { PrismaClient } from './app/generated/prisma'
// const prisma = new PrismaClient();




// import { PrismaClient } from "@prisma/client";
import {PrismaClient} from '../generated/prisma';

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ["query"], // Optional: helps debugging
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;




