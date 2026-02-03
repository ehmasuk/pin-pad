import { Button } from "@workspace/ui/components/button";
import { Kbd } from "@workspace/ui/components/kbd";
import { Tooltip, TooltipContent, TooltipTrigger } from "@workspace/ui/components/tooltip";

import type { ComponentPropsWithoutRef } from "react";

interface Props extends ComponentPropsWithoutRef<typeof Button> {
  icon: React.ReactNode;
  tooltip?: string;
  kbd?: string;
}

export function IconButton({ icon, tooltip, kbd, ...props }: Props) {
  return (
    <Tooltip>
      <TooltipTrigger asChild className="cursor-pointer">
        <Button variant="outline" size="icon" {...props}>
          {icon}
        </Button>
      </TooltipTrigger>
      {tooltip && (
        <TooltipContent className="pr-1.5">
          <div className="flex items-center gap-2">
            {tooltip} {kbd && <Kbd>{kbd}</Kbd>}
          </div>
        </TooltipContent>
      )}
    </Tooltip>
  );
}
