import * as React from 'react'

import { cn } from './utils'

interface SelectOption {
  value: string
  label: string
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options?: SelectOption[]
  placeholder?: string
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, children, options, placeholder, ...props }, ref) => {
    return (
      <div className="relative inline-block w-full">
        <select
          className={cn(
            'w-full h-[40px] rounded-md border border-[#dee1e6] bg-white px-3 py-2 pr-9 text-sm text-[#565d6d] font-sans appearance-none',
            'focus:outline-none focus:border-[#0078bd]',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            className,
          )}
          ref={ref}
          {...props}
        >
          {placeholder && (
            <option value="">
              {placeholder}
            </option>
          )}
          {options
            ? options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))
            : children}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3.31 5.32L8 10.01L12.69 5.32"
              stroke="#171A1F"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    )
  },
)
Select.displayName = 'Select'

export { Select }
export type { SelectOption, SelectProps }
