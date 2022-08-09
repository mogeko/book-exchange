import Logo from "@/components/base/logo";
import Layout from "@/layouts/layout";
import fetcher from "@/lib/fetcher";
import useQuery from "@/lib/hooks/useQuery";
import logoImage from "@/public/images/logo.svg";
import { enqueueSnackbar } from "notistack";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { useRouter } from "next/router";
import type { NextPage } from "next";
import CryptoJS from "crypto-js";
import React, { useEffect } from "react";
import { useCookies } from "react-cookie";

const Login: NextPage = () => {
  return (
    <Layout>
      <main className="hero flex-1">
        <div className="hero-content flex-col w-full">
          <header className="flex items-center justify-center py-2">
            <Logo size="w-12" src={logoImage} />
          </header>
          <h1 className="text-2xl font-bold text-center">
            Sign in to Bookworm
          </h1>
          <LoginForm />
        </div>
      </main>
      <Layout.Footer time={2022} author="Zheng Junyi" />
    </Layout>
  );
};

const LoginForm: React.FC = () => {
  const { data: salt, isLoading } = useQuery<Salt>("/api/auth/salt");
  const { register, handleSubmit } = useForm<LoginFormInput>();
  const [[cookies], router] = [useCookies(), useRouter()];
  const onSubmit: SubmitHandler<LoginFormInput> = async (data) => {
    const hmac = salt ? CryptoJS.HmacSHA256(data.password, salt.salt) : null;
    const base64 = hmac ? hmac.toString(CryptoJS.enc.Base64) : null;

    const auth = await fetcher<ResType>("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({
        username: data.username,
        password: base64,
        salt: salt?.salt,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }).catch((_) => {
      enqueueSnackbar("Login Failed!", { variant: "error" });
    });

    if (auth) {
      enqueueSnackbar("Login Success!", { variant: "success" });
      router.back();
    }
  };

  useEffect(() => {
    if (cookies["auth-id"] && cookies["auth-token"]) {
      router.back();
    }
  }, [cookies, router]);

  return (
    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
      <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
        <Input
          title="Username or email address"
          placeholder="username / email"
          type="text"
          {...(isLoading ? { disabled: true } : {})}
          {...register("username")}
        />
        <Input
          title="Password"
          type="password"
          {...(isLoading ? { disabled: true } : {})}
          {...register("password")}
        />
        <div className="form-control mt-6">
          <input className="btn btn-primary" type="submit" value="Sign in" />
        </div>
      </form>
    </div>
  );
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ title, placeholder, ...props }, ref) => (
    <div className="form-control">
      <label className="label">
        <span className="label-text">{title}</span>
      </label>
      <input
        placeholder={placeholder ?? title.toLowerCase()}
        className="input input-bordered"
        {...props}
        ref={ref}
      />
    </div>
  )
);
Input.displayName = "Input";

type InputProps = {
  title: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export interface LoginFormInput {
  username: string;
  password: string;
}

export interface Salt {
  salt: string;
}

export interface ResType {
  id: `${number}`;
  token: string;
}

export default Login;
