import React from 'react'

import { cn } from './utils'

interface FileUploadProps {
  id: string
  label?: string
  description?: string
  accept?: string
  value?: File | null
  onChange: (file: File | null) => void
  className?: string
  variant?: 'default' | 'ghost' | 'primary' | 'secondary'
}

export const FileUpload: React.FC<FileUploadProps> = ({
  id,
  label,
  description,
  accept,
  value,
  onChange,
  className,
  variant = 'secondary',
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    onChange(file)
  }

  const uploadIcon = (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14.667 10v2.667A1.333 1.333 0 0113.333 14H2.667a1.333 1.333 0 01-1.334-1.333V10M11.333 5.333L8 2m0 0L4.667 5.333M8 2v8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )

  return (
    <div className={cn('flex flex-col gap-2 py-2', className)}>
      {label && (
        <label className="text-sm font-semibold text-[#171a1f]">{label}</label>
      )}
      <label htmlFor={id} className="w-fit cursor-pointer">
        <span
          className={cn(
            'inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors min-h-[40px] px-6',
            variant === 'default' &&
              'bg-[#0079BF] text-white hover:bg-[#005f8e]',
            variant === 'primary' &&
              'bg-[#0078bd] text-white hover:bg-[#006aa8] border-none px-6 py-2.5 rounded-md font-semibold',
            variant === 'secondary' &&
              'bg-white text-[#565d6d] hover:bg-[#f7f8fa] border border-[#dee1e6] px-6 py-2.5 rounded-md font-semibold',
            variant === 'ghost' &&
              'bg-transparent text-[#0079BF] hover:bg-[#e6f4fa]',
          )}
        >
          <span className="inline-flex items-center justify-center shrink-0">
            {uploadIcon}
          </span>
          {value ? value.name : 'Escolher arquivo'}
        </span>
      </label>
      <input
        id={id}
        type="file"
        accept={accept}
        className="hidden"
        onChange={handleChange}
      />
      {description && (
        <span className="text-xs text-[#565d6d]">{description}</span>
      )}
    </div>
  )
}
