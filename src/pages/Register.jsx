import { Form, Link, redirect } from "react-router-dom";
import { FormInput, SubmitBtn } from "../components";
import { customFetch } from "../utils";
import { toast } from "react-toastify";

const url = "/auth/local/register";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const registerParams = Object.fromEntries(formData);
  try {
    const { data } = await customFetch.post(url, registerParams);
    toast.success("Registered successfully");
    return redirect("/login");
  } catch (error) {
    console.log(error);
    const errorMsg =
      error?.response?.data?.error?.message || "Please verify your credentials";
    toast.error(errorMsg);
    return null;
  }
};

const Register = () => {
  return (
    <main className="h-screen grid place-items-center">
      <Form
        method="post"
        className="card w-96 p-8 bg-base-100 shadow-lg flex flex-col gap-y-4"
      >
        <h4 className="text-center text-3xl font-bold">Register</h4>
        <FormInput label="username" type="text" name="username" />
        <FormInput label="email" type="email" name="email" />
        <FormInput label="password" type="password" name="password" />
        <div className="mt-4">
          <SubmitBtn text="register" />
        </div>
        <p className="text-center">
          Already a member?{" "}
          <Link
            to="/login"
            className="ml-2 link link-accent link-hover capitalize"
          >
            login
          </Link>
        </p>
      </Form>
    </main>
  );
};

export default Register;
