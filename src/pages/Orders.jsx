import { redirect, useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";
import { customFetch } from "../utils";
import {
  OrdersList,
  PaginationContainerComplex,
  SectionTitle,
} from "../components";

const url = "/orders";

const ordersQuery = (params, user) => {
  return {
    queryKey: [
      "orders",
      user.username,
      params.page ? parseInt(params.page) : 1,
    ],
    queryFn: () => {
      return customFetch.get(url, {
        params,
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
    },
  };
};

export const loader = (store, queryClient) => {
  return async ({ request }) => {
    const user = store.getState().userState.user;
    if (!user) {
      toast.warn("Please log in to view the orders");
      return redirect("/login");
    }
    const params = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ]);
    try {
      const { data } = await queryClient.ensureQueryData(
        ordersQuery(params, user)
      );
      return { orders: data.data, meta: data.meta };
    } catch (error) {
      console.log(error);
      const errorMsg =
        error?.response?.data?.error?.message ||
        "There was an error retrieving your orders";
      toast.error(errorMsg);
      if (error?.response?.status === 401 || 403) {
        return redirect("/login");
      }
      return null;
    }
  };
};

const Orders = () => {
  const { meta } = useLoaderData();
  if (meta.pagination.total < 1) {
    return <SectionTitle title="no orders yet" />;
  }

  return (
    <>
      <SectionTitle title="your orders" />
      <OrdersList />
      <PaginationContainerComplex />
    </>
  );
};

export default Orders;
