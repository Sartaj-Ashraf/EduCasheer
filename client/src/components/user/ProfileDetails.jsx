const ProfileDetails = ({ user }) => {
  return (
    <div className="mt-6 bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-4">Profile Details</h2>
      <div className="space-y-2">
        <p>
          <span className="font-medium">Role:</span> {user.role}
        </p>
        <p>
          <span className="font-medium">Joined:</span>{" "}
          {new Date(user.createdAt).toLocaleDateString()}
        </p>
        <p>
          <span className="font-medium">Last Updated:</span>{" "}
          {new Date(user.updatedAt).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};
export default ProfileDetails;