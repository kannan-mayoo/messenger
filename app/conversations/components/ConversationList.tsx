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
import { useState } from "react";
import useConversation from " /app/hooks/useConversation"
import { MdOutlineGroupAdd } from "react-icons/md";
import ConversationBox from "./ConversationBox";

// import { Conversation } from " /app/generated/prisma";


interface ConversationListProps{
    initialItems: FullConversationType[]; 
    // initialItems: Conversation[];

}


const ConversationList:React.FC<ConversationListProps> = ({
    initialItems
}) => {
    console.log("FullConversationType Block", FullConversationType);
    console.log("InitialItems Block", initialItems);
    const [items, setItems] = useState(initialItems);
    const router= useRouter();


    console.log("This is Items in ConversationList", items);

    const { conversationId, isOpen } = useConversation();
    return ( 
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
     );
}
 
export default ConversationList;