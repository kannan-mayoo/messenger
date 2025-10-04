// import { prisma } from "../generated/prisma";

import getCurrentUser from "./getCurrentUser";
import { PrismaClient } from "../generated/prisma";
const prisma = new PrismaClient();

const getConversations = async () => {
    const currentUser = await getCurrentUser();

    if(!currentUser?.id) {
        return [];
    }
    try{
        const conversations = await prisma.conversation.findMany({
            orderBy: {
                lastMessagesAt: 'desc'
            }, 
            where: {
                userIds: {
                    has: currentUser.id
                }
            },
            include: {
                users: true,
                messages: {
                    include: {
                        sender: true,
                        seen: true
                    }
                }
            }
        });

        return conversations;
    } catch(error:any) {
        return "Error in getConverations section";
        // console.log("Error on fetching current User")
    }
}

export default getConversations;
