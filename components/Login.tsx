const Login = () => (
    <div>
        <form method="post">
            <input type="text" name="username" placeholder="Username" required></input>
            <input type="text" name="password" placeholder="Password" required></input>
            <button type="submit">Log In</button>
        </form>
    </div>
);
 
export default Login;