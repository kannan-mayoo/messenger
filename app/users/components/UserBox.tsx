"use client";


import { User } from ' /app/generated/prisma';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';
import axios from 'axios';
import Avatar from ' /app/components/Avatar';
import LoadingModal from ' /app/components/LoadingModal';





interface UserBoxProps {
    data:User[]
}

const UserBox:React.FC<UserBoxProps> = (
    {data}
) => {
    console.log("Data is reading proper",data);
    const router = useRouter();
    const[isLoading, setIsLoading] = useState(false);

    const handleClick = useCallback(()=>{
        setIsLoading(true);

        axios.post('/api/conversations', {
            userId: data.id
        })
        .then((data)=>{
            // console.log('Axios response:', response);
            // console.log('Response data:', response.data);
            router.push(`/conversations/${data.data.id}`)
        })
        .finally(()=>{
            setIsLoading(false);
        })
    },[data, router])

    console.log('User type:', data);
    type Check = typeof data; // Hover over this in VSCode, confirm it's picking up the proper User type.



    return (
        <>
            {isLoading && (
                <LoadingModal />
            )}
            
            <div
            onClick={handleClick}
            className='
            relative
            flex
            items-center
            w-full
            space-x-3
            bg-white
            p-3
            hover:bg-neutral-100
            rounded-lg
            transition
            cursor-pointer
            '>
                {console.log("Now inside return",data.name)}
                
                <Avatar user={data} />
                <div className='min-w-0 flex-1'>
                    <div className='focus:outline-none'>
                        <div className="
                        flex
                        justify-between
                        items-center
                        mb-1">
                            <p className='
                            text-sm
                            font-medium
                            text-gray-900
                            ' >
                                {data.name}
                                {/* <p>{data.name ?? "No name found"}</p> */}


                            </p>

                        </div>

                    </div>
                </div>

            </div>
        </>
    )
}

export default UserBox;