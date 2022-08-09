import { useForm } from "react-hook-form";
import type { UseFormRegister, UseFormProps } from "react-hook-form";
import type { FieldValues, SubmitHandler } from "react-hook-form";
import React from "react";

const Form: React.FC<FormProps> = (props) => {
  const { children, onSubmit, className, loading, opts } = props;
  const { handleSubmit, ...methods } = useForm(opts);

  return (
    <form className={className} onSubmit={handleSubmit(onSubmit)}>
      {React.Children.map(children, (child) => {
        const props = {
          ...child.props,
          ...(loading ? { disabled: true } : {}),
          key: child.props.name ?? child.props.label,
          register: methods.register,
        };

        return child.props.name || child.props.label
          ? React.createElement(child.type, { ...props })
          : child;
      })}
    </form>
  );
};

export const Input: React.FC<InputProps> = (props) => {
  const { label, name, register, className, ...rest } = props;

  if (register) {
    return (
      <div className="form-control">
        {label && (
          <label className="label">
            <span className="label-text">{label}</span>
          </label>
        )}
        <input
          className={className ?? "input input-bordered"}
          placeholder={rest.placeholder ?? label?.toLowerCase() ?? name}
          {...register(name ?? label?.toLowerCase() ?? "")}
          {...rest}
        />
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
  label?: string;
  name?: string;
  className?: string;
};

type InputProps = FormChild & React.InputHTMLAttributes<HTMLInputElement>;

export default Form;
