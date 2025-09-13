function Signin() {
  return (
    <form class="auth-form auth-form--signin">
      <div class="auth-form__field">
        <input type="text" class="auth-form__input" placeholder="Name:" />
        <label for="name" class="auth-form__label">
          Name:
        </label>
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

      <div class="auth-form__actions">
        <button class="auth-form__button">Sign in</button>
      </div>
    </form>
  );
}

export default Signin;
