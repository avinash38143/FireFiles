import React from "react";
import { useDispatch } from "react-redux";
import { signUpUser } from "../../redux/actionCreators/authActionCreator";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const RegisterForm = () => {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [passwordConfirmation, setPasswordConfirmation] = React.useState("");
  const [success, setSuccess] = React.useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !password || !passwordConfirmation) {
      toast.error("Please Enter all the required field/fields.");
      return;
    }
    if (password != passwordConfirmation) {
      toast.error("Password don't match.");
      return;
    }

    dispatch(signUpUser(name, email, password, setSuccess));
  };

  React.useEffect(() => {
    if (success) {
      navigate("/dashboard");
    }
  }, [success]);

  return (
    <form action="" autoComplete="off" onSubmit={handleSubmit}>
      <div className="form-group my-2">
        <input
          type="text"
          name="name"
          className="form-control"
          placeholder="Enter Your Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="form-group my-2">
        <input
          type="email"
          name="email"
          className="form-control"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="form-group my-2">
        <input
          type="password"
          name="password"
          className="form-control"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="form-group my-2">
        <input
          type="password"
          name="passwordConfirmation"
          className="form-control"
          placeholder="Re-type Password"
          value={passwordConfirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
        />
      </div>
      <button type="submit" className="btn btn-primary my-2 from-control">
        Register
      </button>
    </form>
  );
};

export default RegisterForm;
