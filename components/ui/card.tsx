import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

const cardVariants = cva('', {
  variants: {
    variant: {
      default:
        'flex flex-col gap-0 p-0 rounded-lg shadow-xl transition duration-200 ease-in-out transform cursor-pointer hover:scale-105',
      dashboard:
        'border-b-primaryBackgroundColor border-b py-3 w-full flex items-normal sm:items-center justify-between gap-4',
      emailVerification: 'grid grid-rows-2 gap-4',
      giftsReceived:
        'flex flex-col gap-0 p-0 rounded-2xl transition border border-[#E0E0E0]',
    },
    size: {
      default: 'h-[360px]',
      dashboard: '',
      emailVerification: 'w-full sm:w-[400px] sm:h-[320px]',
      giftsReceived: 'h-[390px]',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
});

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  asChild?: boolean;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(cardVariants({ variant, size, className }))}
        {...props}
      />
    );
  }
);

const cardHeaderVariants = cva('', {
  variants: {
    variant: {
      default: 'flex flex-col space-y-1.5 p-2',
      dashboard:
        'min-h-[90px] bg-primaryBorderColor rounded-lg min-w-[90px] flex justify-center',
      emailVerification: 'flex justify-center items-end',
    },
    size: {
      default: '',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
});

export interface CardHeaderProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardHeaderVariants> {
  asChild?: boolean;
}

const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(cardHeaderVariants({ variant, size, className }))}
        {...props}
      />
    );
  }
);

const cardContentVariants = cva('flex flex-col', {
  variants: {
    variant: {
      default: 'flex-grow w-full p-0',
      dashboard:
        'gap-1 flex-grow justify-evenly sm:justify-between items-normal',
    },
    size: {
      default: '',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
});

export interface CardContentProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardContentVariants> {
  asChild?: boolean;
}

const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(cardContentVariants({ variant, size, className }))}
        {...props}
      />
    );
  }
);

const cardFooterVariants = cva('flex', {
  variants: {
    variant: {
      default: 'items-center p-0',
      dashboard: 'flex-col gap-2 sm:gap-4 sm:flex-row justify-center',
    },
    size: {
      default: '',
      dashboard: '',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
});

export interface CardFooterProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardFooterVariants> {
  asChild?: boolean;
}

const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(cardFooterVariants({ variant, size, className }))}
        {...props}
      />
    );
  }
);

Card.displayName = 'Card';

CardHeader.displayName = 'CardHeader';

CardContent.displayName = 'CardContent';

CardFooter.displayName = 'CardFooter';

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      'text-2xl font-semibold leading-none tracking-tight',
      className
    )}
    {...props}
  />
));
CardTitle.displayName = 'CardTitle';

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p ref={ref} className={cn('text-sm', className)} {...props} />
));
CardDescription.displayName = 'CardDescription';

export {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
};
