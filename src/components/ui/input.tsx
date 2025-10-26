import * as React from 'react'

import Image from 'next/image'

import { cn } from './utils'

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: string
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, icon, ...props }, ref) => {
    if (!icon) {
      return (
        <input
          type={type}
          className={cn(
            'flex h-[40px] w-full rounded-md border border-[#dee1e6] bg-white px-3 py-2 text-sm text-[#171a1f] font-sans',
            'placeholder:text-[#565d6d]',
            'focus:outline-none focus:border-[#0078bd]',
            'file:border-0 file:bg-transparent file:text-sm file:font-medium',
            'disabled:cursor-not-allowed disabled:opacity-50',
            className,
          )}
          ref={ref}
          {...props}
        />
      )
    }

    return (
      <div className="relative flex items-center w-full">
        <Image
          src={icon}
          alt=""
          width={16}
          height={16}
          className="absolute left-3 w-4 h-4 z-10 pointer-events-none"
        />
        <input
          type={type}
          className={cn(
            'flex h-[40px] w-full rounded-md border border-[#dee1e6] bg-white pl-10 pr-3 py-2 text-sm text-[#171a1f] font-sans',
            'placeholder:text-[#565d6d]',
            'focus:outline-none focus:border-[#0078bd]',
            'file:border-0 file:bg-transparent file:text-sm file:font-medium',
            'disabled:cursor-not-allowed disabled:opacity-50',
            className,
          )}
          ref={ref}
          {...props}
        />
      </div>
    )
  },
)
Input.displayName = 'Input'
