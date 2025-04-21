import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { signinValidationSchema } from "../schema/auth";
import { useDispatch } from "react-redux";
import { fetchUser } from "../store/slice";
import { signin } from "../services/auth";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: signinValidationSchema,
    onSubmit: async (values) => {
      try {
        const response = await signin(values);
        if (response.status === 200) {
          alert("Login successful! Redirecting...");
          dispatch(fetchUser());
          navigate("/");
        }
      } catch (error) {
        alert(error.response?.data?.message || "Login failed!");
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <h1 className="text-2xl font-medium">Signin</h1>
      <div className="flex flex-col mt-6 justify-around space-y-7 px-5 py-4">
        <input
          type="text"
          className="border p-2 rounded-lg"
          placeholder="Enter email"
          name="email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
        />
        {formik.touched.email && formik.errors.email && (
          <p className="text-orange-500">{formik.errors.email}</p>
        )}

        <input
          type="password"
          className="border p-2 rounded-lg"
          placeholder="Enter password"
          name="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
        />
        {formik.touched.password && formik.errors.password && (
          <p className="text-orange-500">{formik.errors.password}</p>
        )}

        <button
          type="submit"
          className="bg-red-600 text-zinc-200 p-3 rounded-lg cursor-pointer hover:bg-red-300"
        >
          Submit
        </button>
      </div>
      <p className="gap-x-4 mt-5">
        Don't have an account?{" "}
        <span className="text-lg text-blue-500">
          <Link to="/signup">Signup</Link>
        </span>
      </p>
    </form>
  );
}
