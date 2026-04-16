import { twMerge } from 'tailwind-merge';

const Input = ({ label, icon: Icon, error, className, ...props }) => {
  return (
    <div className="space-y-2 w-full">
      {label && <label className="text-sm font-bold text-slate-800 ml-1">{label}</label>}
      <div className="relative group">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-orange-500 transition-colors">
            <Icon size={20} strokeWidth={2} />
          </div>
        )}
        <input
          className={twMerge(
            'w-full py-4 rounded-[1.5rem] border-2 border-slate-100 bg-slate-50/50 text-slate-900 placeholder:text-slate-400 focus:bg-white focus:ring-4 focus:ring-orange-100 focus:border-orange-500 transition-all duration-200 outline-none',
            Icon ? 'pl-14 pr-6' : 'px-6',
            error ? 'border-red-500 focus:ring-red-100 focus:border-red-500' : '',
            className
          )}
          {...props}
        />
      </div>
      {error && <p className="text-xs font-semibold text-red-500 ml-4">{error}</p>}
    </div>
  );
};

export default Input;