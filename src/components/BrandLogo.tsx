import { BearIcon } from "./BearIcon";

interface BrandLogoProps {
  title?: string;
}

export function BrandLogo({ title = "Vin's Survival Gids" }: BrandLogoProps) {
  return (
    <div className="flex items-center gap-3">
      {/* Een strak ontworpen bruine container voor het logo, zoals gevraagd */}
      <div className="w-11 h-11 bg-[#26160d] rounded-xl flex items-center justify-center p-2 shadow-lg border-2 border-[#a16e38]/30 shrink-0">
        <BearIcon className="w-full h-full drop-shadow-md" />
      </div>
      {title && (
        <h1 className="text-xl font-bold tracking-tight drop-shadow-sm font-heading">
          {title}
        </h1>
      )}
    </div>
  );
}
