import { motion } from 'framer-motion';
import { twMerge } from 'tailwind-merge';
import { clsx } from 'clsx';

const Button = ({ 
  children, 
  className, 
  variant = 'primary', 
  isLoading, 
  ...props 
}) => {
  const variants = {
    primary: 'bg-gradient-to-r from-orange-500 to-amber-600 text-white shadow-orange-500/30 hover:from-orange-600 hover:to-amber-700',
    secondary: 'bg-slate-900 text-white hover:bg-slate-800 shadow-slate-900/20',
    outline: 'border-2 border-slate-200 text-slate-700 hover:border-orange-500 hover:text-orange-600 bg-transparent',
    ghost: 'text-slate-600 hover:bg-slate-100'
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={twMerge(
        clsx(
          'relative flex items-center justify-center gap-2 px-6 py-3 rounded-2xl font-bold transition-all shadow-lg disabled:opacity-50 disabled:pointer-events-none',
          variants[variant],
          className
        )
      )}
      {...props}
    >
      {isLoading ? (
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 border-3 border-white/30 border-t-white rounded-full animate-spin" />
          <span>Cargando...</span>
        </div>
      ) : children}
    </motion.button>
  );
};

export default Button;