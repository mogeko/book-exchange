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
  const { label, register, className, errors, ...rest } = props;
  const key = rest.name ?? label?.toLowerCase()!;
  const error = errors?.[key]?.message;
  const defaultClassName = classNames(
    error ? "input-error" : "",
    "input input-bordered"
  );

  if (register && (rest.name || label)) {
    return (
      <div className="form-control">
        {label && (
          <label className="label">
            <span className="label-text">{label}</span>
          </label>
        )}
        <input
          className={className ?? defaultClassName}
          placeholder={rest.placeholder ?? label?.toLowerCase() ?? rest.name}
          {...{ ...register(key), ...rest }}
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
  label?: string;
  name?: string;
  className?: string;
};

type InputProps = FormChild & React.InputHTMLAttributes<HTMLInputElement>;

export default Form;
