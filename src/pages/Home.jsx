import { Outlet, useNavigation } from "react-router-dom";
import { Header, Loading, Navbar } from "../components";

const Home = () => {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  return (
    <main>
      <Header />
      <Navbar />
      <section className="align-element py-20">
        {isLoading ? <Loading /> : <Outlet />}
      </section>
    </main>
  );
};

export default Home;
