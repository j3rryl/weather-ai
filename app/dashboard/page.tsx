"use client";
import InputPrompt from "@/components/forms/input-prompt";
import * as z from "zod";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useActions, useUIState } from "ai/rsc";
import { AI } from "@/components/layout/aibar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Page() {
  const [messages, setMessages] = useUIState();
  const { submitUserMessage } = useActions();

  const [loading, setLoading] = useState<boolean>(false);
  const formSchema = z.object({
    prompt: z.string(),
  });
  type InputFormValue = z.infer<typeof formSchema>;
  const defaultValues = {
    prompt: "",
  };
  const form = useForm<InputFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });
  const onSubmit = async (data: InputFormValue) => {
    try {
      setLoading(true);
      setMessages((currentMessages: any) => [
        ...currentMessages,
        {
          id: Date.now(),
          role: "User",
          display: <div>{data.prompt}</div>,
        },
      ]);

      // Submit and get response message
      const responseMessage = await submitUserMessage(data.prompt);
      setMessages((currentMessages: any) => [
        ...currentMessages,
        responseMessage,
      ]);
      form.reset({ prompt: "" });
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div className="flex flex-col h-full p-2 md:p-2 pt-6 gap-2">
        <ScrollArea className="flex-grow h-5/6">
          {messages?.map((message: any, index: number) => {
            return (
              <div
                key={index}
                className="flex justify-start gap-5 mb-5 items-start"
              >
                <Avatar>
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                  <AvatarFallback>WA</AvatarFallback>
                </Avatar>
                <div className="flex flex-col gap-2">
                  <p>{message.role}</p>
                  <div>{message.display}</div>
                </div>
              </div>
            );
          })}
        </ScrollArea>
        <div>
          <InputPrompt onSubmit={onSubmit} loading={loading} form={form} />
        </div>
      </div>
    </>
  );
}
