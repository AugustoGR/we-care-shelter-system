import * as React from 'react'

import { cn } from './utils'

const Checkbox = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => {
  return (
    <input
      type="checkbox"
      className={cn(
        'h-4 w-4 rounded border border-[#dee1e6] bg-white text-[#0078bd] cursor-pointer',
        'focus:outline-none focus:ring-2 focus:ring-[#0078bd] focus:ring-offset-2',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        className,
      )}
      ref={ref}
      {...props}
    />
  )
})
Checkbox.displayName = 'Checkbox'

export { Checkbox }
