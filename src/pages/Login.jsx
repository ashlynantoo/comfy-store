import { Form, Link, redirect, useNavigate } from "react-router-dom";
import { FormInput, SubmitBtn } from "../components";
import { customFetch } from "../utils";
import { toast } from "react-toastify";
import { loginUser } from "../features/user/userSlice";
import { useDispatch } from "react-redux";

const url = "/auth/local";

export const action = (store) => {
  return async ({ request }) => {
    const formData = await request.formData();
    const loginParams = Object.fromEntries(formData);
    try {
      const { data } = await customFetch.post(url, loginParams);
      store.dispatch(loginUser(data));
      toast.success("Logged in successfully");
      return redirect("/");
    } catch (error) {
      console.log(error);
      const errorMsg =
        error?.response?.data?.error?.message ||
        "Please verify your credentials";
      toast.error(errorMsg);
      return null;
    }
  };
};

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGuestUser = async () => {
    try {
      const { data } = await customFetch.post(url, {
        identifier: "test@test.com",
        password: "secret",
      });
      dispatch(loginUser(data));
      toast.success("Welcome guest user");
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error("Guest user login error. Please try again later");
    }
  };

  return (
    <main className="h-screen grid place-items-center">
      <Form
        method="post"
        className="card w-96 p-8 bg-base-100 shadow-lg flex flex-col gap-y-4"
      >
        <h4 className="text-center text-3xl font-bold">Login</h4>
        <FormInput label="email" type="email" name="identifier" />
        <FormInput label="password" type="password" name="password" />
        <div className="mt-4">
          <SubmitBtn text="login" />
        </div>
        <button
          type="button"
          className="btn btn-error btn-block"
          onClick={handleGuestUser}
        >
          guest user
        </button>
        <p className="text-center">
          Not a member yet?{" "}
          <Link
            to="/register"
            className="ml-2 link link-accent link-hover capitalize"
          >
            register
          </Link>
        </p>
      </Form>
    </main>
  );
};

export default Login;
