// import getCurrentUser from " /app/actions/getCurrentUser";
import { NextResponse } from "next/server";
// import {prisma} from " /app/libs/prismadb";
import { prisma } from './../../libs/prismadb';
// import { prisma } from ' /app/libs/prismadb';
// import { PrismaClient } from './app/generated/prisma'
// const prisma = new PrismaClient()npm 

// import { prisma } from "../../../libs/prismadb"
import getCurrentUser from "./../../actions/getCurrentUser";
import {pusherServer} from " /app/libs/pusher";


// export async function GET() {
//   return NextResponse.json({ ok: true, timestamp: Date.now() });
// }

export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser();

    const body = await request.json();
    const { message, image, conversationId } = body;

    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    console.log("API /api/messages hit by:", currentUser.id, "payload:", { message, image, conversationId });
   
   
    // return NextResponse.json({ received: true, body }, { status: 201 });
    
    const newMessage = await prisma.message.create({
      data: {
        body: message,
        image,
        conversation: {
          connect: {
            id: conversationId,
          }
        },
        sender: {
          connect: {
            id: currentUser.id
          },
        },
        seen: {
          connect: {
            id: currentUser.id,
          }
        }
      },
      include: {
        seen: true,
        sender: true,
        conversation:true
      },
    });



    const updatedConversation = await prisma.conversation.update({
      where: {
        id: conversationId,
      },
      data: {
        lastMessagesAt: new Date(),
        messages: {
          connect: {
            id: newMessage.id,
          },
        },
      },
      include: {
        users: true,
        messages: {
          include: {
            seen: true,
          },
        },
      },
    });

    await pusherServer.trigger(conversationId, 'messages:new', newMessage);

    const lastMessage = updatedConversation.messages[updatedConversation.messages.length - 1];

    updatedConversation.users.map((user) => {
      pusherServer.trigger(user.email!, 'conversation:update', {
        id: conversationId,
        messages: [lastMessage]
      });
    });

  return NextResponse.json(newMessage);
  } catch (err) {
    console.log(err, 'ERROR_MESSAGES');
    return new NextResponse("Internal Error", { status: 500 });
  }
}