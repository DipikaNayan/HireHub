import JobCard from "../jobs/JobCard.jsx";

const Jobs = [
  {
    id: 1,
    title: "Frontend Developer",
    company: "Google",
    location: "Bangalore",
    type: "Full Time",
    salary: "₹18 LPA",
  },
  {
    id: 2,
    title: "Backend Developer",
    company: "Microsoft",
    location: "Hyderabad",
    type: "Full Time",
    salary: "₹20 LPA",
  },
  {
    id: 3,
    title: "MERN Stack Developer",
    company: "Amazon",
    location: "Remote",
    type: "Remote",
    salary: "₹22 LPA",
  },
  {
    id: 4,
    title: "React Developer",
    company: "Adobe",
    location: "Noida",
    type: "Internship",
    salary: "₹40K / Month",
  },
  {
    id: 5,
    title: "MERN Stack Developer",
    company: "Amazon",
    location: "Remote",
    type: "Remote",
    salary: "₹22 LPA",
  },
  {
    id: 6,
    title: "React Developer",
    company: "Adobe",
    location: "Noida",
    type: "Internship",
    salary: "₹40K / Month",
  },
  {
    id: 7,
    title: "MERN Stack Developer",
    company: "Amazon",
    location: "Remote",
    type: "Remote",
    salary: "₹22 LPA",
  },
  {
    id: 8,
    title: "React Developer",
    company: "Adobe",
    location: "Noida",
    type: "Internship",
    salary: "₹40K / Month",
  },
];

const FeaturedJobs = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <div className=" flex justify-between items-center mb-10">
        <h2 className=" text-3xl font-bold">Featured Jobs</h2>

        <button className="text-blue-600 dont-semibold hover:underline">
          View All
        </button>
      </div>
      <div className="grid md:grid-cols-2 lg-grid-cols-2 gap-6">
        {Jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </section>
  );
};

export default FeaturedJobs;
