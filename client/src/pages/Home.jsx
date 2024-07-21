import React from "react";
import { Link } from "react-router-dom";
const Home = () => {
  return (
    <div className="min-h-screen flex flex-row justify-between items-center lg:px-32 px-5 bg-[url('./assets/hero.jpg')] bg-cover bg-no-repeat">
      <div className="w-full lg:w-2/3 space-y-5">
        <h1 className="text-[#b7bca9] font-semibold text-6xl">
          Elevate Your Inner Foodie with Every Bite.
        </h1>
        <p className="text-[#b7bca9]">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur soluta cumque harum explicabo quae tenetur dolorum inventore accusamus, in, est facilis fugiat mollitia non cupiditate dolorem quisquam hic sunt laboriosam dicta earum quia? Voluptates molestiae ipsum itaque minima in nihil labore enim vero ex, mollitia est vitae numquam a quod explicabo, id accusantium earum? Maiores consectetur consequuntur sit sint reprehenderit!
        </p>
        <div className="lg:pl-44">
          <Link to="/service" className="" >
          <button title="Order Now" className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded-full">
            Order Now
          </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;

