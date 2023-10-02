import { Link } from "react-router-dom";
import hero1 from "../assets/images/hero1.webp";
import hero2 from "../assets/images/hero2.webp";
import hero3 from "../assets/images/hero3.webp";
import hero4 from "../assets/images/hero4.webp";

const carouselImages = [hero1, hero2, hero3, hero4];

const Hero = () => {
  return (
    <div className="grid md:grid-cols-2 gap-24 items-center">
      <div className="text-center md:text-left">
        <h1 className="max-w-2xl mx-auto text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
          We are changing the way people shop.
        </h1>
        <p className="mt-8 max-w-xl mx-auto text-lg text-justify leading-8">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta
          voluptas illo debitis obcaecati, iusto eligendi aliquam, numquam
          maiores officiis natus.
        </p>
        <div className="mt-10">
          <Link to="/products" className="btn btn-accent">
            our products
          </Link>
        </div>
      </div>
      <div className="hidden md:carousel carousel-center h-[28rem] p-4 space-x-4 bg-neutral rounded-box">
        {carouselImages.map((image, index) => {
          return (
            <div key={index} className="carousel-item">
              <img
                src={image}
                alt="carousel image"
                className="rounded-box h-full w-80 object-cover"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Hero;
