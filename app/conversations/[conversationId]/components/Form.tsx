 "use client";

import useConversation from " /app/hooks/useConversation";
import axios from "axios";
import React from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { HiPaperAirplane, HiPhoto } from "react-icons/hi2";
import MessageInput from "./MessageInput";
import { CldUploadButton } from "next-cloudinary";
// import {CldUploadButton} from "next-cloudinary";



const Form = () => {
  const { conversationId } = useConversation();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      message: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setValue("message", "", { shouldValidate: true });
    try{
       const res = axios.post("/api/messages", {
        ...data,
        conversationId,
      });
    } catch (error: any) {
    console.error("Failed to send message:", error?.response?.data ?? error.message);
    // show an error toast or set an error state if needed
  }
  }

//   type UploadResult = {
//   info?: {
//     secure_url?: string;
//     [key: string]: any;
//   };
//   [key: string]: any;
// };

  const handleUpload = (result: any) => {
    axios.post("/api/messages", {
      image: result?.info?.secure_url,
      conversationId,
    });
  };

  return (
    <div className="py-4 px-4 bg-white border-t flex items-center gap-2 lg:gap-4 w-full">
      <CldUploadButton
        options={{
          maxFiles: 1,
        }}
        onSuccess={handleUpload}
        uploadPreset="ffsfwleg"
      >
        <HiPhoto
          size={30}
          className="text-sky-500 hover:text-sky-600 cursor-pointer transition"
        />
      </CldUploadButton>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex items-center gap-2 lg:gap-4 w-full"
      >
        <MessageInput
          id="message"
          register={register}
          errors={errors}
          required
          placeholder="Write a message"
        />
        <button
          type="submit"
          className="rounded-full p-2 bg-sky-500 cursor-pointer hover:bg-sky-600 transition"
        >
          <HiPaperAirplane size={18} className="text-white" />
        </button>
      </form>
    </div>
  );
};

export default Form;