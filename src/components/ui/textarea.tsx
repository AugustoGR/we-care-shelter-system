import * as React from 'react'

import { cn } from './utils'

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        'w-full rounded-md border border-[#dee1e6] bg-white px-3 py-2.5 text-sm text-[#171a1f] font-sans leading-normal min-h-[100px] resize-vertical',
        'placeholder:text-[#565d6d]',
        'focus:outline-none focus:border-[#0078bd]',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        className,
      )}
      ref={ref}
      {...props}
    />
  )
})
Textarea.displayName = 'Textarea'

export { Textarea }
