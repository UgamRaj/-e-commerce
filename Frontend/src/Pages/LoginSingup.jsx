import "./LoginSignup.css";

const LoginSingup = () => {
  return (
    <div className="loginSignup">
      <div className="loginSignupContainer">
        <h1>Sign Up</h1>
        <div className="loginSignupFields">
          <input type="text" placeholder="Your Name" />
          <input type="email" placeholder="Email Address" />
          <input type="password" placeholder="Password" />
        </div>
        <button>Continue</button>
        <p className="loginSignupLogin">
          Already have an account? <span>Login Here</span>
        </p>
        <div className="loginSignupAgree">
          <input type="checkbox" name="" id="" />
          <p>By continueing, i agree to the terms of use & privecy policy.</p>
        </div>
      </div>
    </div>
  );
};

export default LoginSingup;
