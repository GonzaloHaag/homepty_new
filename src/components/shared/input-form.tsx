import { Input } from "../ui/input";
import { forwardRef, type InputHTMLAttributes } from "react";
import { Field, FieldLabel } from "../ui/field";

interface InputFormProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  labelFor?: string;
  error?: string;
  placeholder: string;
  type: string;
}

export const InputForm = forwardRef<HTMLInputElement, InputFormProps>(
  ({ label, labelFor, error, placeholder, type, ...props }, ref) => {
    return (
      <Field className="flex flex-col gap-y-2 text-sm">
        <FieldLabel htmlFor={labelFor} className="font-medium text-gray-700">
          {label}
        </FieldLabel>
        <Input
          ref={ref}
          placeholder={placeholder}
          type={type}
          aria-invalid={error ? "true" : "false"}
          {...props}
        />
        {error && <p className="text-xs text-red-600">{error}</p>}
      </Field>
    );
  }
);
InputForm.displayName = "InputForm";
