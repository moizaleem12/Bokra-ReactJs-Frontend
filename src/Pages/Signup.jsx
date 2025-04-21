import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { signupValidationSchema } from "../schema/auth";
import { signup } from "../services/auth"; 

export default function Signup() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    validationSchema: signupValidationSchema,
    onSubmit: async (values) => {
      try {
        const response = await signup(values); // 🔁 call reusable API
        if (response.status === 201) {
          alert("Signup successful! Redirecting to login...");
          navigate("/signin");
        }
      } catch (error) {
        alert(error.response?.data?.message || "Signup failed!");
        console.error("Signup error:", error);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <h1 className="text-2xl font-medium">Signup</h1>
      <div className="flex flex-col mt-6 justify-around gap-y-3 px-5 py-4">
        <input
          type="text"
          className="border p-2 rounded-lg"
          placeholder="Enter username"
          name="username"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.username}
        />
        {formik.touched.username && formik.errors.username && (
          <p className="text-orange-500">{formik.errors.username}</p>
        )}

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
          className="bg-red-600 text-white p-3 rounded-lg cursor-pointer hover:bg-red-300"
        >
          Signup
        </button>
      </div>
      <p className="gap-x-4 mt-5">
        Already have an account?{" "}
        <span className="text-lg text-orange-500">
          <Link to="/signin">Signin</Link>
        </span>
      </p>
    </form>
  );
}
