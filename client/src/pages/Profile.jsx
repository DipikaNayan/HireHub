import { useAuth } from "../contexts/AuthContext";

const Profile = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="bg-blue-600 h-32"></div>

        <div className="flex flex-col items-center -mt-14">
          <img
            src="https://ui-avatars.com/api/?name=User&background=2563eb&color=fff&size=200"
            alt="Profile"
            className="w-28 h-28 rounded-full border-4 border-white"
          />

          <h2 className="mt-4 text-2xl font-bold">{user.fullName}</h2>

          <p className="text-gray-500">{user.email}</p>

          <span className="mt-3 bg-blue-100 text-blue-700 px-4 py-1 rounded-full text-sm">
            {user.role}
          </span>
        </div>

        <div className="grid md:grid-cols-2 gap-6 p-8">
          <div>
            <h3 className="font-semibold text-gray-700">Full Name</h3>

            <p className="mt-2 text-gray-600">{user.fullName}</p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-700">Email</h3>

            <p className="mt-2 text-gray-600">{user.email}</p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-700">Role</h3>

            <p className="mt-2 text-gray-600 capitalize">{user.role}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
