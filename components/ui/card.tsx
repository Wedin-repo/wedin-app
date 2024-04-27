import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

const cardVariants = cva('', {
  variants: {
    variant: {
      default:
        'flex flex-col bg-white rounded-lg gap-0 p-0 transition duration-200 ease-in-out transform hover:scale-105 hover:shadow-2xl',
      dashboard:
        'border-b-[#848484] border-b pb-3 w-full flex items-center justify-between gap-4',
    },
    size: {
      default: 'h-[400px]',
      dashboard: '',
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
        'h-[90px] bg-borderColor rounded-xl w-[90px] flex items-center justify-center',
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
      dashboard: 'gap-1 w-full justify-start',
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

const cardFooterVariants = cva('flex items-center ', {
  variants: {
    variant: {
      default: 'p-0',
      dashboard: 'gap-3',
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
