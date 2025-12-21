"use client";
import { HeartIcon } from "lucide-react";
import { Button } from "../ui/button";

export function FavoriteButton() {
  const addToFavorites = (e: React.MouseEvent) => {
    e.preventDefault();
  };
  return (
    <Button
      size="icon"
      variant="ghost"
      className="absolute bottom-3 right-3 w-9 h-9 rounded-full bg-card/90 backdrop-blur-sm shadow-md opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 hover:bg-card hover:text-destructive"
      onClick={addToFavorites}
    >
      <HeartIcon className="w-4 h-4" />
    </Button>
  );
}
