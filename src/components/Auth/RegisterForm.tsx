"use client";

import { authAtom } from "@/lib/atoms";
import { registerFormSchema, RegisterFormType } from "@/lib/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSetAtom } from "jotai";
import { LoaderIcon, SendIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Button } from "../shadcnui/button";
import { Field, FieldError, FieldLabel } from "../shadcnui/field";
import { Input } from "../shadcnui/input";

const RegisterForm = () => {
  const setAuth = useSetAtom(authAtom);

  const { push } = useRouter();

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = useForm({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    mode: "all",
  });

  const registerformHandler = async (regData: RegisterFormType) => {
    setAuth(regData);

    await new Promise((r) => setTimeout(r, 1000));

    toast.success(`Your Registration Was Successful !!`);

    push("/");
  };
  return (
    <form
      onSubmit={handleSubmit(registerformHandler)}
      className="grid gap-4"
      noValidate>
      <Controller
        name="name"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>Name</FieldLabel>
            <Input
              {...field}
              type="text"
              id={field.name}
              aria-invalid={fieldState.invalid}
              placeholder="Enter your Name"
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

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
              placeholder="Enter your Email"
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

export default RegisterForm;
