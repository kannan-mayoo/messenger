// import prisma from " /app/libs/prismadb";
import { prisma } from " /app/libs/prismadb";
import getCurrentUser from "./getCurrentUser";
// import { prisma } from './../libs/prismadb';
// import { PrismaClient } from "../generated/prisma";
// const prisma = new PrismaClient();

const getConversationById = async (conversationId: string) => {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser?.email) return null;

    const conversation = await prisma.conversation.findUnique({
      where: {
        id: conversationId,
      },
      include: {
        users: true,
      },
    });

    return conversation;
  } catch (err) {
    return null;
  }
};

export default getConversationById;