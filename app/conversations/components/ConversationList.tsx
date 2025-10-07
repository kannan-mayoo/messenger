// const ConversationList = () => {
//     return ( 
//         <div>
//             Conversation List
//         </div>
//      );
// }
 
// export default ConversationList;



"use client"

import clsx from "clsx";
import { FullConversationType } from " /app/types";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import useConversation from " /app/hooks/useConversation"
import { MdOutlineGroupAdd } from "react-icons/md";
import ConversationBox from "./ConversationBox";
import GroupChatModal from "./GroupChatModal";
// import { User } from "../generated/prisma";
import { User } from " /app/generated/prisma";
import {useSession} from "next-auth/react";
import { find } from "lodash";
import { pusherServer } from " /app/libs/pusher";
import { pusherClient } from " /app/libs/pusher";

// import { Conversation } from " /app/generated/prisma";


interface ConversationListProps{
    initialItems: FullConversationType[]; 
    // initialItems: Conversation[];
    users: User[];

}


const ConversationList:React.FC<ConversationListProps> = ({
    initialItems,
    users
}) => {
    const session = useSession();

    console.log("FullConversationType Block", FullConversationType);
    console.log("InitialItems Block", initialItems);
    const [items, setItems] = useState(initialItems);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const router= useRouter();


    console.log("This is Items in ConversationList", items);

    const { conversationId, isOpen } = useConversation();

   const pusherKey = useMemo(() => {
    return session.data?.user?.email;
    }, [session.data?.user?.email]);

    useEffect(() => {
    if (!pusherKey) {
        return;
    }

    pusherClient.subscribe(pusherKey);

    const newHandler = (conversation:FullConversationType) => {
        // handler code here 
        setItems((current) => {
        if (find(current, { id: conversation.id })) {
            return current;
        }

        return [conversation, ...current];
        });

    };

    const updateHandler = (conversation: FullConversationType) => {
    setItems((current) => current.map((currentConversation) => {
    if (currentConversation.id === conversation.id) {
        return {
        ...currentConversation,
        messages: conversation.messages
        };
    }

    return currentConversation;
    }))
    }


    const removeHandler = (conversation: FullConversationType) => {
    setItems((current) => {
        return [...current.filter((convo) => convo.id !== conversation.id)];
    });

    
    if (conversationId === conversation.id) {
    router.push('/conversations');
    }

};


    pusherClient.bind('conversation:new', newHandler);
    pusherClient.bind('conversation:update', updateHandler);
    pusherClient.bind('conversation:remove', removeHandler);


    return () => {
        pusherClient.unsubscribe(pusherKey);
        pusherClient.unbind('conversation:new', newHandler);
        pusherClient.unbind('conversation:update', updateHandler);

    };
    }, [pusherKey, conversationId, router]);
 

    
    return ( 
        <>
            <GroupChatModal
            users={users}
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
             />
            <aside
            className={clsx(`
                fixed
                inset-y-0
                pb-20
                lg:pb-0
                lg:left-20
                lg:w-80
                lg:block
                overflow-y-auto
                border-r
                border-gray-200
                `, 
                isOpen ? 'hidden' : "block w-full left-0"
            )}
            >
                <div className= "px-5">
                    <div className="flex justify-between mb-4 pt-4" >
                        <div className="
                        text-2xl
                        font-bold
                        text-neutral-800"
                        >
                            Messages
                        </div>
                        <div
                        onClick={() => setIsModalOpen(true)}
                        className="
                        rounded-full
                        p-2
                        bg-gray-100
                        text-grauy-600
                        cursor pointer
                        hover:opacity-75
                        transition"
                        >
                            <MdOutlineGroupAdd size={20} />
                        </div>
                    </div>
                    {items.map((item)=>(
                        <ConversationBox
                        key={item.id}
                        data={item}
                        selected={conversationId === item.id}
                        />
                    ))}

                    {/* <ConversationBox />
                    <ConversationBox /> */}

                </div>
            </aside>
        </>
     );
}
 
export default ConversationList;