import SearchBar from "./SearchBar.jsx";
const Hero = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      <div className="max-w-3xl">
        <p className="text-blue-600 font-semibold uppercase tracking-wider">
          Find Your Dream Career
        </p>
        <h1 className="text-5xl font-bold mt-4 leading-tight">
          Discover Opportunities That Match Your Skills
        </h1>
        <p className="text-gray-600 mt-6 text-lg">
          HireHub connects talented professionals with top companies. Search
          jobs, apply instantly, and built your career with confidence
        </p>
        <div className="mt-8 flex gap-4">
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
            Find Jobs
          </button>
          <button className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 transition">
            {" "}
            Post a Job
          </button>
        </div>
      </div>
      <SearchBar />
    </section>
  );
};
export default Hero;
