
import React from 'react';
import Spinner from './Spinner';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  isLoading?: boolean;
  variant?: 'primary' | 'secondary' | 'danger';
  icon?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  children,
  isLoading = false,
  variant = 'primary',
  icon,
  ...props
}) => {
  const baseClasses =
    'px-6 py-3 rounded-lg font-mono text-sm font-bold tracking-wider uppercase transition-all duration-200 ease-out transform active:scale-[0.98] flex items-center justify-center space-x-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-950 disabled:opacity-50 disabled:cursor-not-allowed disabled:grayscale';
  
  const variantClasses = {
    primary: 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/50 hover:bg-cyan-500/20 hover:border-cyan-400 hover:shadow-[0_0_20px_rgba(6,182,212,0.3)] focus:ring-cyan-500',
    secondary: 'bg-slate-800/50 text-slate-300 border border-slate-700 hover:bg-slate-700/50 hover:text-white hover:border-slate-500 focus:ring-slate-500',
    danger: 'bg-rose-500/10 text-rose-400 border border-rose-500/50 hover:bg-rose-500/20 hover:border-rose-400 hover:shadow-[0_0_20px_rgba(244,63,94,0.3)] focus:ring-rose-500',
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]}`}
      disabled={props.disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <Spinner size="4" />
      ) : (
        <>
          {icon}
          <span>{children}</span>
        </>
      )}
    </button>
  );
};

export default Button;
