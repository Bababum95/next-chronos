'use client';

import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { FC } from 'react';

import { cn } from '@/lib/utils';

type TooltipProviderProps = React.ComponentProps<typeof TooltipPrimitive.Provider>;

const TooltipProvider: FC<TooltipProviderProps> = ({ delayDuration = 0, ...props }) => (
  <TooltipPrimitive.Provider
    data-slot="tooltip-provider"
    delayDuration={delayDuration}
    {...props}
  />
);

type TooltipProps = React.ComponentProps<typeof TooltipPrimitive.Root>;

const Tooltip: FC<TooltipProps> = ({ ...props }) => (
  <TooltipProvider>
    <TooltipPrimitive.Root data-slot="tooltip" {...props} />
  </TooltipProvider>
);

type TooltipTriggerProps = React.ComponentProps<typeof TooltipPrimitive.Trigger>;

const TooltipTrigger: FC<TooltipTriggerProps> = ({ ...props }) => (
  <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />
);

type TooltipContentProps = React.ComponentProps<typeof TooltipPrimitive.Content>;

const TooltipContent: FC<TooltipContentProps> = ({
  className,
  sideOffset = 0,
  children,
  ...props
}) => (
  <TooltipPrimitive.Portal>
    <TooltipPrimitive.Content
      data-slot="tooltip-content"
      sideOffset={sideOffset}
      className={cn(
        'bg-primary text-primary-foreground animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-fit origin-(--radix-tooltip-content-transform-origin) rounded-md px-3 py-1.5 text-xs text-balance',
        className
      )}
      {...props}
    >
      {children}
      <TooltipPrimitive.Arrow className="bg-primary fill-primary z-50 size-2.5 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px]" />
    </TooltipPrimitive.Content>
  </TooltipPrimitive.Portal>
);

type TooltipLiteProps = {
  children: React.ReactNode;
  content: React.ReactNode;
};

const TooltipLite: FC<TooltipLiteProps> = ({ children, content }) => (
  <Tooltip>
    <TooltipTrigger asChild>{children}</TooltipTrigger>
    <TooltipContent>{content}</TooltipContent>
  </Tooltip>
);

export { Tooltip, TooltipContent, TooltipLite, TooltipProvider, TooltipTrigger };
