function Signup() {
  return (
    <form class="auth-form auth-form--signup">
      <div class="auth-form__field">
        <label for="name" class="auth-form__label">
          Name:
        </label>
        <input type="text" class="auth-form__input" placeholder="Name:" />
      </div>

      <div class="auth-form__field">
        <label for="email" class="auth-form__label">
          Email:
        </label>
        <input type="text" class="auth-form__input" placeholder="Email:" />
      </div>

      <div class="auth-form__field">
        <label for="password" class="auth-form__label">
          Password:
        </label>
        <input
          type="password"
          class="auth-form__input"
          placeholder="Password:"
        />
      </div>

      <div class="auth-form__field">
        <label for="confirm-password" class="auth-form__label">
          Confirm Password:
        </label>
        <input
          type="password"
          class="auth-form__input"
          placeholder="Confirm Password:"
        />
      </div>

      <div class="auth-form__actions">
        <button class="auth-form__button">Signup</button>
      </div>
    </form>
  );
}

export default Signup;
