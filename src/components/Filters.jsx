import { Form, Link, useLoaderData } from "react-router-dom";
import { FormInput, FormSelect, FormRange, FormCheckbox } from "../components";

const Filters = () => {
  const { meta, queryParams } = useLoaderData();
  const { name, category, company, sort, price, freeShipping } = queryParams;
  return (
    <Form className="bg-base-200 rounded-md px-8 py-4 grid gap-x-4 gap-y-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-center">
      <FormInput
        label="search product"
        type="search"
        name="name"
        defaultValue={name}
        size="input-sm"
      />
      <FormSelect
        label="select category"
        name="category"
        list={meta.categories}
        defaultValue={category}
        size="select-sm"
      />
      <FormSelect
        label="select company"
        name="company"
        list={meta.companies}
        defaultValue={company}
        size="select-sm"
      />
      <FormSelect
        label="sort by"
        name="sort"
        list={["price-low", "price-high", "a-z", "z-a"]}
        defaultValue={sort}
        size="select-sm"
      />
      <FormRange
        label="select price"
        name="price"
        size="range-sm"
        price={price}
      />
      <FormCheckbox
        label="free shipping"
        name="freeShipping"
        defaultValue={freeShipping}
        size="checkbox-sm"
      />
      <button type="submit" className="btn btn-accent btn-sm">
        search
      </button>
      <Link to="/products" className="btn btn-error btn-sm">
        reset
      </Link>
    </Form>
  );
};

export default Filters;
