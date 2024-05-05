"use client";
import InputPrompt from "@/components/forms/input-prompt";
import * as z from "zod";
import { ScrollArea } from "@/components/ui/scroll-area";
import { RefObject, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { getProfile, getWeather } from "@/app/server-actions/weather";

export default function Page() {
  // const scrollRef = useRef(null);
  const scrollRef: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);

  const [weather, setWeather] = useState<any>([]);
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

      // Profile UI
      const profileUI = await getProfile(data.prompt);
      setWeather((currentUpdates: any) => [...currentUpdates, profileUI]);

      // Weather UI Updates
      const weatherUI = await getWeather(data.prompt);
      setWeather((currentUpdates: any) => [...currentUpdates, weatherUI]);
      if (scrollRef.current) {
        scrollRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
      }
      form.reset({ prompt: "" });
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div className="flex flex-col h-full p-2 md:p-2 pt-6 gap-2">
        <ScrollArea ref={scrollRef} className="flex-grow h-5/6">
          {weather}
        </ScrollArea>
        <div>
          <InputPrompt onSubmit={onSubmit} loading={loading} form={form} />
        </div>
      </div>
    </>
  );
}
