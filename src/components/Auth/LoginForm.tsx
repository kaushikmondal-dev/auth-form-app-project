"use client";

import { authAtom } from "@/lib/atoms";
import { loginFormSchema, LoginFormType } from "@/lib/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAtomValue } from "jotai";
import { LoaderIcon, SendIcon } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Button } from "../shadcnui/button";
import { Field, FieldError, FieldLabel } from "../shadcnui/field";
import { Input } from "../shadcnui/input";

const LoginForm = () => {
  const auth = useAtomValue(authAtom);
  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = useForm({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "all",
  });

  const loginformHandler = async ({ email, password }: LoginFormType) => {
    await new Promise((r) => setTimeout(r, 1000));

    if (email === auth.email && password === auth.password) {
      toast.success(`Welcome:${auth.name}`);
    } else {
      if (email !== auth.email) {
        toast.error(`Wrong Email`);
      }
      if (password !== auth.password) {
        toast.error(`Wrong password`);
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit(loginformHandler)}
      className="grid gap-4"
      noValidate>
      <Controller
        name="email"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>Email</FieldLabel>
            <Input
              {...field}
              type="text"
              id={field.name}
              aria-invalid={fieldState.invalid}
              placeholder="Enter your FieldErrormail"
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <Controller
        name="password"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>Password</FieldLabel>
            <Input
              {...field}
              type="password"
              id={field.name}
              aria-invalid={fieldState.invalid}
              placeholder="Enter your password"
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <Button
        type="submit"
        disabled={isSubmitting}>
        {isSubmitting ?
          <>
            <LoaderIcon className="animate-spin" />
            Submitting..
          </>
        : <>
            <SendIcon /> Submit
          </>
        }
      </Button>
    </form>
  );
};

export default LoginForm;
