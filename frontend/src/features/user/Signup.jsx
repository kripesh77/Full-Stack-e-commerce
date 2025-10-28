import { useState } from "react";
import { useForm } from "react-hook-form";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { useAuth } from "./useAuth";

function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();

  const { mutate: signup, isPending } = useAuth({ signup: true });

  function onSubmit(data) {
    console.log(data);
    signup(data);
  }

  return (
    <form
      className="auth-form auth-form--signup"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="auth-form__field">
        <input
          type="text"
          className="auth-form__input"
          placeholder="Name:"
          {...register("name", { required: "Name is required" })}
          style={{ borderColor: `${errors?.name ? "red" : ""}` }}
        />
        <label htmlFor="name" className="auth-form__label">
          Name:
        </label>
        {errors?.name && (
          <span className="auth-form__input--error">
            {errors?.name.message}
          </span>
        )}
      </div>

      <div className="auth-form__field">
        <input
          type="email"
          className="auth-form__input"
          placeholder="Email:"
          {...register("email", { required: "Email is required" })}
          style={{ borderColor: `${errors?.email ? "red" : ""}` }}
        />
        <label htmlFor="email" className="auth-form__label">
          Email:
        </label>
        {errors?.email && (
          <span className="auth-form__input--error">
            {errors?.email.message}
          </span>
        )}
      </div>

      <div className="auth-form__field">
        <input
          type={`${showPassword ? "text" : "password"}`}
          className="auth-form__input"
          placeholder="Password:"
          {...register("password", { required: "Password is required" })}
          style={{ borderColor: `${errors?.password ? "red" : ""}` }}
        />
        <label htmlFor="password" className="auth-form__label">
          Password:
        </label>
        <span
          onClick={() => setShowPassword((s) => !s)}
          className="auth-form__toogle"
        >
          {showPassword ? <IoEyeOutline /> : <IoEyeOffOutline />}
        </span>
        {errors?.password && (
          <span className="auth-form__input--error">
            {errors?.password.message}
          </span>
        )}
      </div>

      <div className="auth-form__field">
        <input
          type={`${showPassword ? "text" : "password"}`}
          className="auth-form__input"
          placeholder="Confirm Password:"
          {...register("confirmPassword", {
            required: "Please confirm the password",
            validate: (value) => {
              const password = getValues("password");
              return value === password || "Passwords don't match";
            },
          })}
          style={{ borderColor: `${errors?.confirmPassword ? "red" : ""}` }}
        />
        <label htmlFor="confirm-password" className="auth-form__label">
          Confirm Password:
        </label>
        <span
          onClick={() => setShowPassword((s) => !s)}
          className="auth-form__toogle"
        >
          {showPassword ? <IoEyeOutline /> : <IoEyeOffOutline />}
        </span>
        {errors?.confirmPassword && (
          <span className="auth-form__input--error">
            {errors?.confirmPassword.message}
          </span>
        )}
      </div>

      <div className="auth-form__actions">
        <button
          className="auth-form__button"
          type="submit"
          disabled={isPending}
        >
          Sign up
        </button>
      </div>
    </form>
  );
}

export default Signup;
