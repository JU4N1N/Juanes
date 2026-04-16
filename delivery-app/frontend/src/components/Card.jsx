import { motion } from 'framer-motion';
import { twMerge } from 'tailwind-merge';

const Card = ({ children, className, hover = true }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={hover ? { y: -8, transition: { duration: 0.2 } } : {}}
      className={twMerge(
        'bg-white rounded-[2rem] p-4 shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden relative',
        className
      )}
    >
      {children}
    </motion.div>
  );
};

// Sub-componente para mantener la consistencia en imágenes
Card.Image = ({ src, alt, badge }) => (
  <div className="relative w-full h-48 mb-4 overflow-hidden rounded-[1.5rem]">
    {badge && (
      <span className="absolute top-3 left-3 z-10 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-orange-600 shadow-sm">
        {badge}
      </span>
    )}
    <img src={src} alt={alt} className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500" />
  </div>
);

export default Card;