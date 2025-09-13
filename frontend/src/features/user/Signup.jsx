import { useForm } from "react-hook-form";

function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();

  function onSubmit(data) {
    console.log("Signup data:", data);
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
          type="password"
          className="auth-form__input"
          placeholder="Password:"
          {...register("password", { required: "Password is required" })}
          style={{ borderColor: `${errors?.password ? "red" : ""}` }}
        />
        <label htmlFor="password" className="auth-form__label">
          Password:
        </label>
        {errors?.password && (
          <span className="auth-form__input--error">
            {errors?.password.message}
          </span>
        )}
      </div>

      <div className="auth-form__field">
        <input
          type="password"
          className="auth-form__input"
          placeholder="Confirm Password:"
          {...register("confirmpassword", {
            required: "Please confirm the password",
            validate: (value) => {
              const password = getValues("password");
              return value === password || "Passwords don't match";
            },
          })}
          style={{ borderColor: `${errors?.confirmpassword ? "red" : ""}` }}
        />
        <label htmlFor="confirm-password" className="auth-form__label">
          Confirm Password:
        </label>
        {errors?.confirmpassword && (
          <span className="auth-form__input--error">
            {errors?.confirmpassword.message}
          </span>
        )}
      </div>

      <div className="auth-form__actions">
        <button className="auth-form__button" type="submit">
          Sign up
        </button>
      </div>
    </form>
  );
}

export default Signup;
