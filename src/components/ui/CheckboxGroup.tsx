import React from 'react'

import { Checkbox } from './checkbox'
import { cn } from './utils'

interface CheckboxOption {
  label: string
  value: string
  checked: boolean
  onChange: (checked: boolean) => void
}

interface CheckboxGroupProps {
  label?: string
  options: CheckboxOption[]
  className?: string
}

export const CheckboxGroup: React.FC<CheckboxGroupProps> = ({
  label,
  options,
  className,
}) => {
  return (
    <div className={cn('flex flex-col gap-3 py-4', className)}>
      {label && (
        <span className="text-sm font-semibold text-[#171a1f]">{label}</span>
      )}
      <div className="flex flex-wrap gap-4">
        {options.map((option) => (
          <label
            key={option.value}
            className="flex items-center gap-2 text-sm text-[#171a1f] cursor-pointer select-none"
          >
            <Checkbox
              checked={option.checked}
              onChange={(e) => option.onChange(e.target.checked)}
            />
            {option.label}
          </label>
        ))}
      </div>
    </div>
  )
}
