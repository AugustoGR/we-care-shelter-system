import * as React from 'react'

const Select = React.forwardRef<
  HTMLSelectElement,
  React.SelectHTMLAttributes<HTMLSelectElement>
>(({ className, children, ...props }, ref) => {
  return (
    <select className={className} ref={ref} {...props}>
      {children}
    </select>
  )
})
Select.displayName = 'Select'

export { Select }
