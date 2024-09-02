import{ FormEvent, useRef } from "react";
import { useAddUser } from "../hooks/useAuth";

const SignUp = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passRef = useRef<HTMLInputElement>(null);
  const { mutate: addUser, error, isError } = useAddUser();

  const handleSignUp = (e: FormEvent) => {
    e.preventDefault();
    const emailInput = emailRef.current?.value!;
    const passInput = passRef.current?.value!;
    addUser({
      email: emailInput,
      password: passInput,
    });
    console.log(error?.response?.data)
  };

  return (
    <>
      <form onSubmit={handleSignUp}>
        <h2>Sign Up</h2>
        <label htmlFor="email">Email</label>
        <input ref={emailRef} type="text" name="email" required />
        {isError && <div className="error email">{error?.response?.data.errors.email}</div>}

        <label htmlFor="password">Password</label>
        <input ref={passRef} type="password" name="password" required />
        {isError && <div className="error email">{error?.response?.data.errors.password}</div>}

        <button>Sign Up</button>
      </form>
    </>
  );
};

export default SignUp;
