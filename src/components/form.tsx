import { useForm } from "react-hook-form";
import type { UseFormRegister, UseFormProps } from "react-hook-form";
import type { FieldValues, SubmitHandler, FieldErrors } from "react-hook-form";
import React from "react";
import classNames from "@/lib/utils/classNames";

const Form: React.FC<FormProps> = (props) => {
  const { children, onSubmit, className, loading, opts } = props;
  const { handleSubmit, ...methods } = useForm(opts);
  const { errors } = methods.formState;

  return (
    <form className={className} onSubmit={handleSubmit(onSubmit)}>
      {React.Children.map(children, (child) => {
        if (!child.props.name && !child.props.label) return child;
        return React.createElement(child.type, {
          ...child.props,
          ...(loading ? { disabled: true } : {}),
          key: child.props.name ?? child.props.label,
          register: methods.register,
          errors: errors,
        });
      })}
    </form>
  );
};

export const Input: React.FC<InputProps> = (props) => {
  const { label, name, register, className, size = "md", ...rest } = props;
  const error = rest.errors?.[name ?? label?.toLowerCase()!]?.message;

  if (register && (name || label)) {
    return (
      <div className="form-control">
        {label && (
          <label className="label">
            <span className="label-text">{label}</span>
          </label>
        )}
        <input
          className={
            className ??
            classNames(
              "input input-bordered",
              error ? "input-error" : "",
              `input-${size}`
            )
          }
          placeholder={rest.placeholder ?? label?.toLowerCase() ?? name}
          {...register(name ?? label?.toLowerCase()!)}
          {...rest}
        />
        {error && (
          <label className="label">
            <span className="label-text-alt text-error">{error as any}</span>
          </label>
        )}
      </div>
    );
  }
  return <input className={className ?? "input input-bordered"} {...rest} />;
};

interface FormProps {
  children: React.ReactElement<FormChild>[];
  onSubmit: SubmitHandler<any>;
  opts?: UseFormProps<FieldValues>;
  className?: string;
  loading?: boolean;
}

type FormChild = {
  register?: UseFormRegister<FieldValues>;
  errors?: FieldErrors<FieldValues>;
  size?: "xs" | "sm" | "md" | "lg";
  label?: string;
  name?: string;
  className?: string;
};

type InputProps = FormChild & React.InputHTMLAttributes<HTMLInputElement>;

export default Form;
