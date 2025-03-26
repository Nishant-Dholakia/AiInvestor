"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { userData } from "@/app/data/user";
import { useEffect, useState } from "react";

const ProfilePage = ({ userProfile }) => {

  const [authToken, setauthToken] = useState(null)
  const [user, setuser] = useState({})
  async function fetchUserData() {
    
    try {
      console.log(authToken)
      const response = await fetch("/api/fetchUserData", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${authToken}`,
          Accept: "application/json",
          
        },
      });
      const data = await response.json();
      console.log(data.data);
      setuser(data.data)
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }


  useEffect(()=>{
    setauthToken(window.localStorage.getItem("token"))
    async function main(){
      await fetchUserData()
    }
    main()
  },[authToken])
  return (
    <div className="min-h-[90vh] flex items-center justify-end bg-gray-950 text-white p-6">
      {/* Profile Container */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-4xl bg-zinc-900/50 backdrop-blur-md rounded-lg shadow-lg border border-gray-800 p-8 flex flex-col md:flex-row gap-8"
      >
        {/* Profile Details */}
        <div className="flex-1">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-violet-500 to-pink-500 bg-clip-text text-transparent">
            {user ? user.name : userProfile.name}
          </h1>
          <p className="text-gray-400 mt-2">{user ? user.email : userProfile.email}</p>

          {/* Fields in a Single Row */}
          <div className="mt-6 grid grid-cols-2 gap-4">
            {Object.entries(userProfile).map(([key, value], index) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="p-3 rounded-lg hover:bg-gray-800/50 transition-all"
              >
                <span className="text-gray-400 capitalize">{key.replace(/_/g, " ")}</span>
                <span className="block font-medium">{value}</span>
              </motion.div>
            ))}
          </div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-8 flex gap-4"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex-1 rounded-lg bg-gradient-to-r from-violet-600 to-pink-600 px-6 py-3 text-white hover:from-violet-700 hover:to-pink-700 transition-all"
            >
              Edit Profile
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex-1 rounded-lg border border-violet-500 px-6 py-3 text-white hover:bg-violet-600/20 transition-all"
            >
              Change Password
            </motion.button>
          </motion.div>
        </div>

        {/* Profile Photo */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex items-center justify-center"
        >
          <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-violet-500 shadow-lg">
            <Image
              src="/profile-picture.jpg" // Replace with your image path
              alt="Profile Picture"
              layout="fill"
              objectFit="cover"
            />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

const Page = () => {
  return <ProfilePage userProfile={userData.user_profile} />;
};

export default Page;