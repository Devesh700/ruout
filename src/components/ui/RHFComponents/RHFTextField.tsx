// components/form/RHFTextField.tsx
import React from "react";
import { useFormContext, FieldError } from "react-hook-form";

interface RHFTextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  placeholder?: string;
  className?: string;
}

const RHFTextField: React.FC<RHFTextFieldProps> = ({
  name,
  label,
  placeholder,
  type = "text",
  className = "",
  ...rest
}) => {
  const {
    register,
    formState: { errors }
  } = useFormContext();

  const error = errors[name] as FieldError | undefined;

  return (
    <div className="mb-4">
      {label && <label className="block mb-1 font-medium" htmlFor={name}>{label}</label>}

      <input
        id={name}
        {...register(name)}
        placeholder={placeholder}
        type={type}
        className={`w-full border p-2 rounded ${className} ${error ? "border-red-500" : ""}`}
        {...rest}
      />

      {error && <p className="text-sm text-red-600 mt-1">{error.message}</p>}
    </div>
  );
};

export default RHFTextField;
