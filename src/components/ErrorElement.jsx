import { useRouteError } from "react-router-dom";

const ErrorElement = () => {
  const error = useRouteError();
  console.log(error);

  return (
    <main className="grid min-h-[50vh] place-items-center px-8">
      <h4 className="text-center font-bold text-4xl">
        An error occurred. Please try again later.
      </h4>
    </main>
  );
};

export default ErrorElement;
