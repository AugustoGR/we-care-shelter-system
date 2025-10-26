import * as React from 'react'

import { cn } from './utils'

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'ghost' | 'primary' | 'secondary'
  icon?: React.ReactNode
  iconPosition?: 'left' | 'right'
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant = 'default', icon, iconPosition = 'left', children, ...props },
    ref,
  ) => {
    return (
      <button
        className={cn(
          'inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none min-h-[40px] px-6',
          variant === 'default' && 'bg-[#0079BF] text-white hover:bg-[#005f8e]',
          variant === 'primary' &&
            'bg-[#0078bd] text-white hover:bg-[#006aa8] border-none px-6 py-2.5 rounded-md font-semibold cursor-pointer',
          variant === 'secondary' &&
            'bg-white text-[#565d6d] hover:bg-[#f7f8fa] border border-[#dee1e6] px-6 py-2.5 rounded-md font-semibold cursor-pointer',
          variant === 'ghost' &&
            'bg-transparent text-[#0079BF] hover:bg-[#e6f4fa]',
          className,
        )}
        ref={ref}
        {...props}
      >
        {icon && iconPosition === 'left' && (
          <span className="inline-flex items-center justify-center shrink-0">
            {icon}
          </span>
        )}
        {children}
        {icon && iconPosition === 'right' && (
          <span className="inline-flex items-center justify-center shrink-0">
            {icon}
          </span>
        )}
      </button>
    )
  },
)
Button.displayName = 'Button'
