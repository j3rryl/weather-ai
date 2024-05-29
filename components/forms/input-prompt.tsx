"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { CommandIcon } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import * as z from "zod";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  prompt: z.string(),
});

type InputFormValue = z.infer<typeof formSchema>;
type SubmitFunction = (data: InputFormValue) => void;
interface InputPromptProps {
  onSubmit: SubmitFunction;
  loading: boolean;
  form: UseFormReturn<InputFormValue>;
}
const InputPrompt: React.FC<InputPromptProps> = ({
  onSubmit,
  loading,
  form,
}) => {
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-2 w-full flex items-center justify-between gap-2"
      >
        <div className="w-full">
          <FormField
            control={form.control}
            name="prompt"
            render={({ field }) => (
              <FormItem>
                {/* <FormLabel>Email</FormLabel> */}
                <FormControl>
                  <Textarea
                    rows={1}
                    required
                    placeholder="Enter location to get weather update (e.g., Nairobi)"
                    disabled={loading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button disabled={loading} type="submit" size="sm">
          <CommandIcon />
        </Button>
      </form>
    </Form>
  );
};

export default InputPrompt;
