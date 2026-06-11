"use client";

import { registerFormSchema, RegisterFormType } from "@/lib/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderIcon, SendIcon } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { Button } from "../shadcnui/button";
import { Field, FieldError, FieldLabel } from "../shadcnui/field";
import { Input } from "../shadcnui/input";

const RegisterForm = () => {
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

  const registerformHandler = async ({
    name,
    email,
    password,
  }: RegisterFormType) => {
    await new Promise((r) => setTimeout(r, 1000));
    console.log(name, email, password);
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
