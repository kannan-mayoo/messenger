import getConversationById from " /app/actions/getConversationById";
import getMessages from " /app/actions/getMessages";
import EmptyState from " /app/components/EmptyState";
import Header from "./components/Header";
import Body from "./components/Body";
import Form from "./components/Form";
import { useEffect } from "react";


interface IParams{
    conversationId: string;
}

const ConversationId = async({params}:{params:IParams}) => {

    const conversation = await getConversationById(params.conversationId);
    const messages = await getMessages(params.conversationId);

    // useEffect(() => {
    // console.log(messages); // Check if 'body' or 'content' exists
    // }, [messages]);

    console.log("Messages in ConversationID", messages)
    console.log("conversationId:", JSON.stringify(params.conversationId));
    console.log("params.conversationId (raw):", params.conversationId);
    console.log("typeof:", typeof params.conversationId);

   
    if (!conversation) {
        return (
        <div className="lg:pl-80 h-full">
            <div className="h-full flex flex-col">
            <EmptyState />
            </div>
        </div>
        );
    }




    return (
        <div className="lg:pl-80 h-full">
            <div className="h-full flex flex-col">
                {console.log("Messages in ConversationID", messages)}
            <Header conversation={conversation} />
            <Body initialMessages={messages} />
            <Form />
            </div>
        </div>
            
    
    )
}

export default ConversationId;