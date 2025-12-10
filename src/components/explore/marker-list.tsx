"use client";
import { Button } from "../ui/button";
interface Props {
  markers: { id: string; coordinates: [number, number] }[];
  removeMarker: (id: string) => void;
}
export function MarkerList({ markers, removeMarker }: Props) {
  return (
    <div className="">
      <h2>Markers</h2>
      {markers.map((marker) => (
        <div key={marker.id} className="">
          <span>{marker.coordinates.join(", ")}</span>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => removeMarker(marker.id)}
          >
            Remove
          </Button>
        </div>
      ))}
    </div>
  );
}
