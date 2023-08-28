"use client";

import { useCallback, useState, useTransition } from "react";
import { format } from "date-fns";
import { LuCalendar } from "react-icons/lu";

import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useBooksContext } from "@/app/(core)/(bookshelf)/made4u/_components/books-context";
import { getReferral } from "@/app/(core)/(bookshelf)/made4u/made4u-actions";

export const DatePicker: React.FC<{
  disabled?: { before: Date; after: Date };
  uid: number;
}> = ({ uid, disabled }) => {
  const [date, setDate] = useState<Date>(new Date());
  const { setbooks } = useBooksContext();
  const [_, startTransition] = useTransition();
  const { toast } = useToast();

  const handleDateChange = useCallback(
    (date = new Date()) => {
      startTransition(async () => {
        try {
          const { books } = await getReferral({ uid, date });
          setbooks(books), setDate(date);
        } catch (error: any) {
          toast({
            variant: "destructive",
            title: "Oooooops! Something went wrong.",
            description: error.message,
          });
        }
      });
    },
    [uid, toast, setbooks]
  );

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          className="w-[280px] justify-start text-left font-normal"
          variant={"outline"}
        >
          <LuCalendar className="mr-2 h-4 w-4" />
          {format(date, "PPP")}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          onSelect={handleDateChange}
          selected={date}
          disabled={disabled}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};
