import React from "react";
import { Header, ProfileDetails, WatchHistory } from "../../components";

const UserProfile = () => {
  const user = {
    fullName: "Sartaj Ashraf",
    username: "_sartaj1911",
    email: "sartajashraf842@gmail.com",
    role: "user",
    createdAt: "2025-02-10T13:04:17.764Z",
    updatedAt: "2025-02-10T19:03:13.319Z",
    watchHistory: [],
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <Header user={user} />
        <ProfileDetails user={user} />
        <WatchHistory watchHistory={user.watchHistory} />
      </div>
    </div>
  );
};

export default UserProfile;
