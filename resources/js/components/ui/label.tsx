import * as LabelPrimitive from "@radix-ui/react-label"
import * as React from "react"

import { cn } from "@/lib/utils"

export type LabelProps =
    React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> & {
    mandatory?: boolean
}

function Label({
  className,
    mandatory = false,
  ...props
}: LabelProps) {
  return (
    <LabelPrimitive.Root
      data-slot="label"
      className={cn(
        "text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className
      )}
      {...props}
    >
        {props.children}
        {mandatory && <span className="text-red-500">*</span>}
    </LabelPrimitive.Root>
  )
}

export { Label }
