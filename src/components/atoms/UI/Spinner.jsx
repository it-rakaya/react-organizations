/////////// IMPORTS
///
import { tv } from 'tailwind-variants';

///
/////////// Types
///
const spinner = tv({
  base: 'animate-spin rounded-full',
  variants: {
    color: {
      primary: 'border-white',
      danger: 'border-mainRed',
      white: '#fff',
    },
    size: {
      small: 'h-4 w-4 border-b-2',
      medium: 'h-6 w-6 border-b-4',
      large: 'h-8 w-8 border-b-4',
    },
  },
  defaultVariants: {
    color: 'white',
    size: 'medium',
  },
});
/////////// HELPER VARIABLES & FUNCTIONS
///

///
export const Spinner = (
  variant = 'primary',
  size = 'medium',
  className,
) => {
  /////////// VARIABLES
  ///

  ///
  /////////// CUSTOM HOOKS
  ///

  ///
  /////////// STATES
  ///

  ///
  /////////// SIDE EFFECTS
  ///

  /////////// FUNCTIONS | EVENTS | IF CASES
  ///

  ///
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div
        className={spinner({
          color: variant,
          size: size,
        })}
        style={{ color: `${variant}` }}
      ></div>
    </div>
  );
};
