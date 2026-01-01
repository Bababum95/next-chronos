import Image from 'next/image';
import type { FC, PropsWithChildren } from 'react';

import { cn } from '@/lib/utils';

type TextProps = PropsWithChildren & {
  size: number;
};

const Text: FC<TextProps> = ({ children, size }) => {
  return (
    <span
      className="whitespace-nowrap overflow-hidden leading-[100%] text-primary font-light"
      style={{ fontSize: `${size}px` }}
    >
      {children}
    </span>
  );
};

type LogoProps = {
  asChild?: boolean;
  size?: number;
  className?: string;
};

export const Logo: FC<LogoProps> = ({ className, asChild = false, size = 28 }) => {
  const content = (
    <>
      <Text size={size}>CHR</Text>
      <Image src="/logo.png" alt="Logo" width={size - 1} height={size - 1} />
      <Text size={size}>NOS</Text>
    </>
  );

  if (asChild) return content;

  return <div className={cn('flex items-center gap-0.5', className)}>{content}</div>;
};
