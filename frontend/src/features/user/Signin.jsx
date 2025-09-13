import { useState } from "react";
import { useForm } from "react-hook-form";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { useAuth } from "./useAuth";

function Signin() {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { mutate: signin, isPending } = useAuth();

  function onSubmit(data) {
    signin(data);
  }

  return (
    <form
      className="auth-form auth-form--signin"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="auth-form__field">
        <input
          type="email"
          className="auth-form__input"
          placeholder="Email:"
          {...register("email", { required: "Email is required" })}
          style={{ borderColor: `${errors.email ? "red" : ""}` }}
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
          style={{
            borderColor: `${errors.password ? "red" : ""}`,
          }}
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

      <div className="auth-form__actions">
        <button
          className="auth-form__button"
          type="submit"
          disabled={isPending}
        >
          Sign in
        </button>
      </div>
    </form>
  );
}

export default Signin;
