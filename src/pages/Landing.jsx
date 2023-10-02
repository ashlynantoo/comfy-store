import { FeaturedProducts, Hero } from "../components";
import { customFetch } from "../utils";

const url = "/products?featured=true";

const featuredProductsQuery = {
  queryKey: ["featuredProducts"],
  queryFn: () => {
    return customFetch(url);
  },
};

export const loader = (queryClient) => {
  return async () => {
    const { data } = await queryClient.ensureQueryData(featuredProductsQuery);
    const products = data.data;
    return { products };
  };
};

const Landing = () => {
  return (
    <section>
      <Hero />
      <FeaturedProducts />
    </section>
  );
};

export default Landing;
