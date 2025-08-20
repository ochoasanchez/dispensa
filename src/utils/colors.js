// src/utils/colors.js
// This file exports an array of color names and a consolidated object
// of corresponding class name maps to be used by other components.
// This is necessary for the Vue compiler and Tailwind's JIT compiler to work correctly with dynamic classes.

// An array of supported color names for validation.
export const supportedColors = [
    'slate', 'gray', 'zinc', 'neutral', 'stone', 'red', 'orange', 'amber', 'yellow',
    'lime', 'green', 'emerald', 'teal', 'cyan', 'sky', 'blue', 'indigo', 'violet',
    'purple', 'fuchsia', 'pink', 'rose', 
  ];
  
  // A consolidated map of color names to their full class strings.
  // This ensures that the Tailwind JIT compiler sees and includes these classes.
  export const colorClasses = {
    slate: { bg: 'bg-slate-200', text: 'text-slate-700' },
    gray: { bg: 'bg-gray-200', text: 'text-gray-700' },
    zinc: { bg: 'bg-zinc-200', text: 'text-zinc-700' },
    neutral: { bg: 'bg-neutral-200', text: 'text-neutral-700' },
    stone: { bg: 'bg-stone-200', text: 'text-stone-700' },
    red: { bg: 'bg-red-200', text: 'text-red-700' },
    orange: { bg: 'bg-orange-200', text: 'text-orange-700' },
    amber: { bg: 'bg-amber-200', text: 'text-amber-700' },
    yellow: { bg: 'bg-yellow-100', text: 'text-yellow-600' },
    lime: { bg: 'bg-lime-200', text: 'text-lime-700' },
    green: { bg: 'bg-green-200', text: 'text-green-700' },
    emerald: { bg: 'bg-emerald-200', text: 'text-emerald-700' },
    teal: { bg: 'bg-teal-200', text: 'text-teal-700' },
    cyan: { bg: 'bg-cyan-200', text: 'text-cyan-700' },
    sky: { bg: 'bg-sky-200', text: 'text-sky-700' },
    blue: { bg: 'bg-blue-200', text: 'text-blue-700' },
    indigo: { bg: 'bg-indigo-200', text: 'text-indigo-700' },
    violet: { bg: 'bg-violet-200', text: 'text-violet-700' },
    purple: { bg: 'bg-purple-200', text: 'text-purple-700' },
    fuchsia: { bg: 'bg-fuchsia-200', text: 'text-fuchsia-700' },
    pink: { bg: 'bg-pink-200', text: 'text-pink-700' },
    rose: { bg: 'bg-rose-200', text: 'text-rose-700' },
    white: { bg: 'bg-stone-200', text: 'text-stone-700' },
  };
  