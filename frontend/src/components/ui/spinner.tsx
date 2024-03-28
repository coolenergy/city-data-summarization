import { CircleDashedIcon } from "lucide-react";

export function Spinner() {
  return (
    <div className="relative">
      <CircleDashedIcon className="animate-spin text-primary size-20" />
      <div className="absolute top-1/2 left-1/2 text-4xl -translate-x-1/2 -translate-y-1/2">
        🏙️
      </div>
    </div>
  );
}
