const Login = ({ error }: { error: string | null }) => (
    <div className="centrado">
      <form method="post">
        <h2 class="juego-mesa">BoardFinder!</h2><span class="loader"/>
        <input type="text" name="username" placeholder="Username" required />
        <input type="password" name="password" placeholder="Password" required />
        <button type="submit">Log In</button>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <a href={"/register"} class="register-link">¿Aun no estas con nosotros? Registrate!</a>

      </form>
    </div>
);
 
export default Login;