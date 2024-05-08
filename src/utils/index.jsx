import axios from "axios";

const baseUrl = "https://ecommerce-store-server-rkso.onrender.com/api/v1";

export const customFetch = axios.create({
  baseURL: baseUrl,
});

export const navLinks = [
  { id: 1, url: "/", text: "home" },
  { id: 2, url: "/about", text: "about" },
  { id: 3, url: "/products", text: "products" },
  { id: 4, url: "/cart", text: "cart" },
  { id: 5, url: "/checkout", text: "checkout" },
  { id: 6, url: "/orders", text: "orders" },
];

export const formatPrice = (price) => {
  const dollarPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format((price / 100).toFixed(2));
  return dollarPrice;
};

export const generateAmountOptions = (length) => {
  return Array.from({ length }, (_, index) => {
    const amount = index + 1;
    return (
      <option key={amount} value={amount}>
        {amount}
      </option>
    );
  });
};
