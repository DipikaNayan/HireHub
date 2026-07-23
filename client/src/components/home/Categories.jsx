const categories = [
  "Frontend",
  "Backend",
  "React",
  "Node.js",
  "Remote",
  "Work From Home",
];

const Categories = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 pb-20">
      <h2 className="text-xl font-semibold mb-6">Popular Searches</h2>
      <div className="flex flex-wrap gap-4">
        {categories.map((item) => (
          <button
            key={item}
            className="px-5 py-2 rounded-full border border-gray-300 hover:bg-blue-600"
          >
            {item}
          </button>
        ))}
      </div>
    </section>
  );
};
export default Categories;
