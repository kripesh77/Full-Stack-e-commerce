import { useForm } from "react-hook-form";

function AuthForm({
  formType = "signin",
  onSubmit,
  children,
  className = "",
  defaultValues = {},
  validationRules = {},
  ...props
}) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    getValues,
    watch,
  } = useForm({
    defaultValues,
    mode: "onBlur",
  });

  // Provide form utilities to children
  const formUtils = {
    register: (name, rules = {}) =>
      register(name, {
        ...validationRules[name],
        ...rules,
      }),
    errors,
    isSubmitting,
    getValues,
    watch,
  };

  const handleFormSubmit = (data) => {
    if (onSubmit) {
      onSubmit(data, formUtils);
    }
  };

  return (
    <form
      className={`auth-form auth-form--${formType} ${className}`}
      onSubmit={handleSubmit(handleFormSubmit)}
      {...props}
    >
      {typeof children === "function" ? children(formUtils) : children}
    </form>
  );
}

export default AuthForm;
