import { useFormik } from "formik";
import { FunctionComponent } from "react";
import { Link, NavigateFunction, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { addUser } from "../services/usersService";
import { createCart } from "../services/cartsService";

interface RegisterProps {}

const Register: FunctionComponent<RegisterProps> = () => {
  const navigate: NavigateFunction = useNavigate();
  const formik = useFormik({
    initialValues: { name: "", email: "", password: "" },
    validationSchema: yup.object({
      name: yup.string().required().min(2),
      email: yup.string().required().email(),
      password: yup.string().required().min(8),
    }),
    onSubmit: (values) => {
      addUser({ ...values, isAdmin: false })
        .then((res) => {
          navigate("/home");
          localStorage.setItem("userId", JSON.stringify(res.data.id));
          createCart(res.data.id)
            .then((res) => {
              console.log("Cart created successfully");
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
    },
  });
  return (
    <div className="container w-25">
      <h5 className="display-5 my-2">REGISTER</h5>
      <form onSubmit={formik.handleSubmit}>
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="name"
            placeholder="John Doe"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <label htmlFor="name">Name</label>
          {formik.touched.name && formik.errors.name && (
            <p className="text-danger">{formik.errors.name}</p>
          )}
        </div>
        <div className="form-floating mb-3">
          <input
            type="email"
            className="form-control"
            id="floatingInput"
            placeholder="name@example.com"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <label htmlFor="floatingInput">Email address</label>
          {formik.touched.email && formik.errors.email && (
            <p className="text-danger">{formik.errors.email}</p>
          )}
        </div>
        <div className="form-floating">
          <input
            type="password"
            className="form-control"
            id="floatingPassword"
            placeholder="Password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <label htmlFor="floatingPassword">Password</label>
          {formik.touched.password && formik.errors.password && (
            <p className="text-danger">{formik.errors.password}</p>
          )}
        </div>
        <button
          className="btn btn-primary mt-3 w-100"
          type="submit"
          disabled={!formik.dirty || !formik.isValid}
        >
          Register
        </button>
      </form>
      <p className="mt-3">
        <Link to="/">Already have an account? Log in</Link>
      </p>
    </div>
  );
};

export default Register;
