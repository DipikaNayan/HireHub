const JobCard = ({ job }) => {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300 p-6">
      <h3 className="text-xl font-semibold">{job.title}</h3>
      <p className="text-gray-600 mt-2">{job.company}</p>

      <div className="flex gap-3 mt-4 flex-wrap">
        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
          {job.location}
        </span>
        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
          {job.type}
        </span>
      </div>

      <div className="mt-5 flex justify-between items-center">
        <p className="font-bold text-lg text-blue-600">{job.salary}</p>

        <button className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700">
          View Details
        </button>
      </div>
    </div>
  );
};

export default JobCard;
