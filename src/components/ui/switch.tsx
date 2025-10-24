import * as React from 'react'

import { cn } from './utils'

export interface SwitchProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  label?: string
  onCheckedChange?: (checked: boolean) => void
}

export const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
  ({ className, label, onCheckedChange, checked, ...props }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (onCheckedChange) {
        onCheckedChange(e.target.checked)
      }
    }

    return (
      <label
        className={cn('inline-flex items-center cursor-pointer', className)}
      >
        <div className="relative">
          <input
            type="checkbox"
            className="sr-only"
            ref={ref}
            onChange={handleChange}
            checked={checked}
            {...props}
          />
          <div
            className={cn(
              'w-11 h-6 rounded-full transition-colors duration-200',
              checked ? 'bg-[#0078BD]' : 'bg-gray-200',
            )}
          >
            <div
              className={cn(
                'absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-200',
                checked ? 'translate-x-5' : 'translate-x-0',
              )}
            />
          </div>
        </div>
        {label && <span className="ml-2 text-sm text-gray-700">{label}</span>}
      </label>
    )
  },
)
Switch.displayName = 'Switch'
