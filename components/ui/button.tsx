import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primaryButton:
          'rounded-full hover:opacity-80 hover transition w-full flex items-center justify-center gap-3 bg-primaryBackgroundColor text-white text-base font-medium',
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        onboardingButton:
          'w-52 bg-[#0F172A] flex items-center justify-center rounded-lg py-2 gap-3 text-white font-medium hover:opacity-80 hover transition',
        chooseGiftListButton:
          'w-48 bg-[#303030] flex items-center justify-center font-normal rounded-full gap-3 text-white hover:opacity-80 hover transition text-xl',
        destructive:
          'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline:
          'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        undoButton:
          'border gap-1 items-center !h-8 border-borderColor !px-3 hover:bg-primaryBackgroundColor hover:text-white',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        editGiftButton:
          'w-52 bg-[#0F172A] flex items-center justify-center rounded-lg py-2 gap-3 text-white font-medium hover:opacity-80 hover transition',
        link: 'text-primary underline-offset-4 hover:underline',
        deleteIconButton:
          'border border-[#484848] hover:border-red-500 hover:bg-red-500 transition-colors hover:text-white rounded-xl',
        editIconButton:
          'border border-[#484848] hover:bg-primaryBackgroundColor transition-colors hover:text-white rounded-xl',
        emptyStateButton:
          'bg-black rounded-full text-white font-normal hover:opacity-80 hover transition text-lg',
        uploadImageButton:
          'w-full bg-white flex items-center justify-center rounded-lg py-2 gap-2 text-black font-medium hover:opacity-60 hover transition',
        logoutButton:
          'px-3 py-3 hover:bg-neutral-100 transition flex gap-2 items-center',
        socialMediaLoginButton:
          'bg-secondaryBackgroundColor text-tertiaryTextColor py-1.5 px-6 rounded-lg w-[208px] hover:opacity-80 transition-all',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
        chooseGiftListButton: 'h-12 px-2',
        iconButton: 'h-10 w-10',
        emptyStateButton: 'h-11 px-4',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
