import React from 'react';
import { cn } from '../../lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'outline' | 'ghost' | 'gold';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', icon, children, disabled, ...props }, ref) => {
    const baseClasses =
      'inline-flex items-center justify-center font-medium transition-all duration-150 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed select-none shadow-sm';

    const variantClasses = {
      primary: 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white focus:ring-blue-500 shadow-blue-500/20',
      secondary: 'bg-slate-800 hover:bg-slate-900 active:bg-black text-white focus:ring-slate-700',
      danger: 'bg-rose-600 hover:bg-rose-700 active:bg-rose-800 text-white focus:ring-rose-500 shadow-rose-500/20',
      outline: 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 focus:ring-slate-400',
      ghost: 'bg-transparent hover:bg-slate-100 text-slate-700 shadow-none border-transparent',
      gold: 'bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-slate-950 font-semibold focus:ring-amber-400 shadow-amber-500/25',
    };

    const sizeClasses = {
      sm: 'px-2.5 py-1.5 text-xs gap-1.5',
      md: 'px-3.5 py-2 text-sm gap-2',
      lg: 'px-5 py-2.5 text-base gap-2.5',
    };

    return (
      <button
        ref={ref}
        className={cn(baseClasses, variantClasses[variant], sizeClasses[size], className)}
        disabled={disabled}
        {...props}
      >
        {icon && <span className="shrink-0">{icon}</span>}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
