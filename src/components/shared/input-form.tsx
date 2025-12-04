import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { forwardRef, type InputHTMLAttributes } from "react";

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
      <div className="flex flex-col gap-y-2 text-sm">
        <Label htmlFor={labelFor} className="font-medium text-gray-700">
          {label}
        </Label>
        <Input
          ref={ref}
          placeholder={placeholder}
          type={type}
          aria-invalid={error ? "true" : "false"}
          {...props}
        />
        {error && <p className="text-xs text-red-600">{error}</p>}
      </div>
    );
  }
);
InputForm.displayName = "InputForm";
