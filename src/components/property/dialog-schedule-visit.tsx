"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CalendarIcon } from "lucide-react";

export function DialogScheduleVisit() {
  const [date, setDate] = useState<Date | undefined>(new Date(2025, 5, 12));
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button type="button" title="Agendar visita" className="w-full">
          <CalendarIcon size={20} />
          Agendar visita
        </Button>
      </DialogTrigger>
      <DialogContent className="md:max-w-xl">
        <DialogHeader>
          <DialogTitle>Programar visita</DialogTitle>
          <DialogDescription>
            Elige la fecha y hora que mejor te convenga para visitar la
            propiedad.
          </DialogDescription>
        </DialogHeader>
        <Calendar
          mode="single"
          defaultMonth={date}
          numberOfMonths={2}
          selected={date}
          onSelect={setDate}
          className="rounded-lg border shadow-sm w-full"
        />
      </DialogContent>
    </Dialog>
  );
}
