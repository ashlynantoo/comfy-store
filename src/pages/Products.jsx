import { Filters, PaginationContainer, ProductsContainer } from "../components";
import { customFetch } from "../utils";

const url = "/products";

const allProductsQuery = (queryParams) => {
  const { search, category, company, order, price, shipping, page } =
    queryParams;
  return {
    queryKey: [
      "products",
      search ?? "",
      category ?? "all",
      company ?? "all",
      order ?? "a-z",
      price ?? 100000,
      shipping ?? false,
      page ?? 1,
    ],
    queryFn: () => {
      return customFetch(url, { queryParams });
    },
  };
};

export const loader = (queryClient) => {
  return async ({ request }) => {
    const params = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ]);
    const { data } = await queryClient.ensureQueryData(
      allProductsQuery(params)
    );
    const { data: products, meta } = data;
    return { products, meta, params };
  };
};

const Products = () => {
  return (
    <section>
      <Filters />
      <ProductsContainer />
      <PaginationContainer />
    </section>
  );
};

export default Products;
