import Products from "./Product/Products";
import Filters from "./Product/Filters";
import Navbar from "./Navbar";

const Home = () => {
  return (
    <>
    <Navbar/>
      <div className="flex mt-20">
        <div className="w-1/5">
          <Filters />
        </div>
        <div className="w-4/5">
          <Products />
        </div>
      </div>
    </>
  );
};

export default Home;
