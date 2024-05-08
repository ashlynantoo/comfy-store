import { redirect, useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";
import { customFetch } from "../utils";
import {
  OrdersList,
  PaginationContainerComplex,
  SectionTitle,
} from "../components";

const ordersQuery = (url, user, page) => {
  const { username, token } = user;
  return {
    queryKey: ["orders", username, page],
    queryFn: () => {
      return customFetch.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
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
    const page = params.page ? parseInt(params.page) : 1;
    const url = `/orders/showAllMyOrders?page=${page}`;
    try {
      const { data } = await queryClient.ensureQueryData(
        ordersQuery(url, user, page)
      );
      const { orders, meta } = data;
      return { orders, meta };
    } catch (error) {
      console.log(error);
      const errorMsg =
        error?.response?.data?.msg ||
        "There was an error retrieving your orders!";
      toast.error(errorMsg);
      if (error?.response?.status === 401 || error?.response?.status === 403) {
        return redirect("/login");
      }
      return redirect("/orders");
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
