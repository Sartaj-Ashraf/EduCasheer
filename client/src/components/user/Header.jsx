import { FaUserCircle } from "react-icons/fa";

const Header = ({ user }) => {
  return (
    <div className="bg-blue-600 text-white p-6 rounded-lg shadow-lg">
      <div className="flex items-center space-x-4">
        <FaUserCircle className="w-16 h-16" />
        <div>
          <h1 className="text-2xl font-bold">{user.fullName}</h1>
          <p className="text-sm">@{user.username}</p>
          <p className="text-sm">{user.email}</p>
        </div>
      </div>
    </div>
  );
};
export default Header;
