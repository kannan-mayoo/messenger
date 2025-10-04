import { prisma } from " /app/libs/prismadb";


const getMessages = async (conversationId: string) => {
  try {
    const messages = await prisma.message.findMany({
      where: {
        conversationId: conversationId
      },
      include: {
        // user: true,
        // seenByUsers: true,
        sender:true, 
        seen:true
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    return messages;
  } catch (err) {
    return [];
  }
};

export default getMessages;