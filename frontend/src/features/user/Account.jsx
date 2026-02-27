import { useForm } from "react-hook-form";
import { useUser, useUpdateUser, useUpdatePassword } from "./useUser";
import { Link } from "react-router-dom";
import { useState } from "react";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import transition from "../../ui/transition";

function Account() {
  const { user, isLoading } = useUser();
  const { updateUser, isUpdating } = useUpdateUser();
  const { updatePassword, isUpdatingPassword } = useUpdatePassword();

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register: registerData,
    handleSubmit: handleSubmitData,
    formState: { errors: errorsData },
  } = useForm({
    defaultValues: {
      name: user?.data?.data?.name,
      email: user?.data?.data?.email,
    },
    values: {
      name: user?.data?.data?.name,
      email: user?.data?.data?.email,
    },
  });

  const {
    register: registerPassword,
    handleSubmit: handleSubmitPassword,
    formState: { errors: errorsPassword },
    reset: resetPassword,
  } = useForm();

  function onSubmitData(data) {
    updateUser(data);
  }

  function onSubmitPassword(data) {
    updatePassword(data, {
      onSuccess: () => resetPassword(),
    });
  }

  if (isLoading) return <div className="spinner"></div>;

  return (
    <div className="account-page">
      <div className="container">
        <div className="account-header">
          <h1 className="heading-secondary">My Account</h1>
          <Link to="/orders" className="btn btn--small btn--outline">
            View My Orders
          </Link>
        </div>

        <div className="account-content">
          <div className="account-section">
            <h2 className="heading-tertiary">Profile Settings</h2>
            <form
              className="form-user-data"
              onSubmit={handleSubmitData(onSubmitData)}
            >
              <div className="form__group">
                <label className="form__label" htmlFor="name">
                  Name
                </label>
                <input
                  className="form__input"
                  id="name"
                  type="text"
                  {...registerData("name", { required: "Name is required" })}
                />
                {errorsData.name && (
                  <span className="form__error">{errorsData.name.message}</span>
                )}
              </div>

              <div className="form__group">
                <label className="form__label" htmlFor="email">
                  Email address
                </label>
                <input
                  className="form__input"
                  id="email"
                  type="email"
                  {...registerData("email", {
                    required: "Email is required",
                    pattern: {
                      value: /\S+@\S+\.\S+/,
                      message: "Please provide a valid email address",
                    },
                  })}
                />
                {errorsData.email && (
                  <span className="form__error">{errorsData.email.message}</span>
                )}
              </div>

              <div className="form__group right">
                <button
                  className="btn btn--small btn--green"
                  disabled={isUpdating}
                >
                  {isUpdating ? "Saving..." : "Save settings"}
                </button>
              </div>
            </form>
          </div>

          <div className="account-section">
            <h2 className="heading-tertiary">Password Change</h2>
            <form
              className="form-user-password"
              onSubmit={handleSubmitPassword(onSubmitPassword)}
            >
              <div className="form__group">
                <label className="form__label" htmlFor="password-current">
                  Current password
                </label>
                <div className="password-input-wrapper">
                  <input
                    className="form__input"
                    id="password-current"
                    type={showCurrentPassword ? "text" : "password"}
                    placeholder="••••••••"
                    {...registerPassword("passwordCurrent", {
                      required: "Current password is required",
                    })}
                  />
                  <span
                    className="password-toggle"
                    onClick={() => setShowCurrentPassword((s) => !s)}
                  >
                    {showCurrentPassword ? (
                      <IoEyeOutline />
                    ) : (
                      <IoEyeOffOutline />
                    )}
                  </span>
                </div>
                {errorsPassword.passwordCurrent && (
                  <span className="form__error">
                    {errorsPassword.passwordCurrent.message}
                  </span>
                )}
              </div>

              <div className="form__group">
                <label className="form__label" htmlFor="password">
                  New password
                </label>
                <div className="password-input-wrapper">
                  <input
                    className="form__input"
                    id="password"
                    type={showNewPassword ? "text" : "password"}
                    placeholder="••••••••"
                    {...registerPassword("password", {
                      required: "New password is required",
                      minLength: {
                        value: 8,
                        message: "Password must be at least 8 characters",
                      },
                    })}
                  />
                  <span
                    className="password-toggle"
                    onClick={() => setShowNewPassword((s) => !s)}
                  >
                    {showNewPassword ? <IoEyeOutline /> : <IoEyeOffOutline />}
                  </span>
                </div>
                {errorsPassword.password && (
                  <span className="form__error">
                    {errorsPassword.password.message}
                  </span>
                )}
              </div>

              <div className="form__group">
                <label className="form__label" htmlFor="password-confirm">
                  Confirm password
                </label>
                <div className="password-input-wrapper">
                  <input
                    className="form__input"
                    id="password-confirm"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="••••••••"
                    {...registerPassword("passwordConfirm", {
                      required: "Please confirm your password",
                      validate: (val, formValues) =>
                        val === formValues.password || "Passwords do not match",
                    })}
                  />
                  <span
                    className="password-toggle"
                    onClick={() => setShowConfirmPassword((s) => !s)}
                  >
                    {showConfirmPassword ? (
                      <IoEyeOutline />
                    ) : (
                      <IoEyeOffOutline />
                    )}
                  </span>
                </div>
                {errorsPassword.passwordConfirm && (
                  <span className="form__error">
                    {errorsPassword.passwordConfirm.message}
                  </span>
                )}
              </div>

              <div className="form__group right">
                <button
                  className="btn btn--small btn--green"
                  disabled={isUpdatingPassword}
                >
                  {isUpdatingPassword ? "Updating..." : "Save password"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

const AccountWithTransition = transition(Account);
AccountWithTransition.displayName = "Account";
export default AccountWithTransition;
