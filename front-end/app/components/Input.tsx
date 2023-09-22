import React, { forwardRef, ChangeEvent } from "react";
import { twMerge } from "tailwind-merge";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, disabled, onChange, ...props }, ref) => {
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      if (onChange) {
        onChange(event);
      }
    };

    return (
      <input
        type={type}
        className={twMerge(
          `
          flex 
          w-full 
          rounded-md 
          bg-neutral-700
          border
          border-transparent
          px-3 
          py-3 
          text-sm 
          file:border-0 
          file:bg-transparent 
          file:text-sm 
          file:font-medium 
          placeholder:text-neutral-400 
          disabled:cursor-not-allowed 
          disabled:opacity-50
          focus:outline-none
        `,
          disabled && 'opacity-75',
          className
        )}
        disabled={disabled}
        ref={ref}
        onChange={handleChange}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export default Input;