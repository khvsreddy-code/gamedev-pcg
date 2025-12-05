
import React from 'react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  children: React.ReactNode;
}

const Select: React.FC<SelectProps> = ({ label, id, children, ...props }) => {
  return (
    <div>
      <label htmlFor={id} className="block text-xs font-mono text-cyan-500/80 mb-2 uppercase tracking-widest">
        {label}
      </label>
      <div className="relative">
        <select
          id={id}
          className="w-full bg-slate-950/50 border border-slate-800 rounded-lg px-4 py-2 text-slate-200 focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 transition-colors appearance-none font-mono text-sm"
          {...props}
        >
          {children}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-500">
          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
        </div>
      </div>
    </div>
  );
};

export default Select;
