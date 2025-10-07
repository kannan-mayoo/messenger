import { prisma } from " /app/libs/prismadb";


const getMessages = async (conversationId: string) => {
  try {
    console.log("[getMessages] conversationId (raw):", conversationId);

    const messages = await prisma.message.findMany({
      where: {
        conversationId
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
    console.log("In getMessage", messages);
    return messages;
  } catch (err) {
    return [];
  }
};

export default getMessages;










// const getMessages = async (conversationId: string) => {
//   try {
//     console.log("[getMessages] conversationId (raw):", conversationId);

//     if (!conversationId) {
//       console.warn("[getMessages] warning: conversationId is falsy");
//       return [];
//     }

//     const cid = conversationId.trim();

//     // 1) Try to fetch conversation.messageIds (your Conversation model has messageIds)
//     const conversation = await prisma.conversation.findUnique({
//       where: { id: cid },
//       select: { messageIds: true },
//     });

//     console.log("[getMessages] conversation.messageIds:", conversation?.messageIds ?? null);

//     if (conversation?.messageIds && conversation.messageIds.length > 0) {
//       const messages = await prisma.message.findMany({
//         where: {
//           id: { in: conversation.messageIds },
//         },
//         include: { sender: true, seen: true },
//         orderBy: { createdAt: "asc" },
//       });

//       console.log(`[getMessages] found messages by messageIds: ${messages.length}`);
//       return messages;
//     }

//     // 2) Fallback - filter by the message's conversation field name in your schema (note capital 'ID')
//     const messagesByConvField = await prisma.message.findMany({
//       where: { conversationId: cid }, // <--- important: conversationID (capital 'ID') matches schema
//       include: { sender: true, seen: true },
//       orderBy: { createdAt: "asc" },
//     });

//     console.log(`[getMessages] found messages by conversationID field: ${messagesByConvField.length}`);
//     return messagesByConvField;
//   } catch (err) {
//     console.error("[getMessages] error:", err);
//     throw err;
//   }
// };

// export default getMessages;