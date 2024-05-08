import { Filters, PaginationContainer, ProductsContainer } from "../components";
import { customFetch } from "../utils";

const allProductsQuery = (queryParams, url) => {
  const { name, category, company, sort, price, freeShipping, page } =
    queryParams;
  return {
    queryKey: [
      "products",
      name ?? "",
      category ?? "all",
      company ?? "all",
      sort ?? "a-z",
      price ?? 100000,
      freeShipping ?? false,
      page ?? 1,
    ],
    queryFn: () => {
      return customFetch(url);
    },
  };
};

export const loader = (queryClient) => {
  return async ({ request }) => {
    const queryParams = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ]);

    let url = "";
    if (Object.keys(queryParams).length === 0) {
      url = "/products";
    } else if (Object.keys(queryParams).length === 1) {
      const page = queryParams.page ? queryParams.page : 1;
      url = `/products?page=${page}`;
    } else {
      const { name, category, company, sort, price, freeShipping } =
        queryParams;
      const page = queryParams.page ? queryParams.page : 1;
      if (freeShipping) {
        url = `/products?name=${name}&category=${category}&company=${company}&sort=${sort}&price=${price}&freeShipping=${freeShipping}&page=${page}`;
      } else {
        url = `/products?name=${name}&category=${category}&company=${company}&sort=${sort}&price=${price}&page=${page}`;
      }
    }

    const { data } = await queryClient.ensureQueryData(
      allProductsQuery(queryParams, url)
    );
    const { products, meta } = data;
    return { products, meta, queryParams };
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
