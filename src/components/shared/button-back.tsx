"use client";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { ArrowLeftIcon } from "lucide-react";

export function ButtonBack() {
  const router = useRouter();

  function backToPreviousPage() {
    router.back();
  }
  return (
    <Button
      type="button"
      title="Regresar"
      variant={"outline"}
      className="min-w-28"
      onClick={backToPreviousPage}
    >
      <ArrowLeftIcon />
      Regresar
    </Button>
  );
}
