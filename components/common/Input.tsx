
import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const Input: React.FC<InputProps> = ({ label, id, ...props }) => {
  return (
    <div>
      <label htmlFor={id} className="block text-xs font-mono text-cyan-500/80 mb-2 uppercase tracking-widest">
        {label}
      </label>
      <input
        id={id}
        className="w-full bg-slate-950/50 border border-slate-800 rounded-lg px-4 py-2 text-slate-200 placeholder-slate-700 focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 transition-colors font-mono text-sm"
        {...props}
      />
    </div>
  );
};

export default Input;
