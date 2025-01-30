import React from 'react';
import { FaLaptopCode, FaCode, FaDatabase, FaChartLine, FaMobileAlt, FaGlobe } from 'react-icons/fa';

const Categories = () => {
  return (
    <div className="bg-gray-100 py-12">
      <div className="">
        <h2 className="text-3xl font-bold text-center mb-8">Explore Diverse Learning Paths Within</h2>
        <h3 className="text-xl text-center mb-12">Our Course Categories</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {/* Computer Science */}
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <FaLaptopCode className="text-4xl text-blue-500 mx-auto mb-4" />
            <h4 className="text-xl font-semibold mb-2">Computer Science</h4>
            <p className="text-gray-600">Explore the fundamentals of computing and algorithms.</p>
          </div>

          {/* Programming */}
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <FaCode className="text-4xl text-green-500 mx-auto mb-4" />
            <h4 className="text-xl font-semibold mb-2">Programming</h4>
            <p className="text-gray-600">Learn various programming languages and paradigms.</p>
          </div>

          {/* Software Development */}
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <FaGlobe className="text-4xl text-purple-500 mx-auto mb-4" />
            <h4 className="text-xl font-semibold mb-2">Software Development</h4>
            <p className="text-gray-600">Master the art of building robust software applications.</p>
          </div>

          {/* Web Development */}
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <FaGlobe className="text-4xl text-red-500 mx-auto mb-4" />
            <h4 className="text-xl font-semibold mb-2">Web Development</h4>
            <p className="text-gray-600">Create responsive and dynamic websites.</p>
          </div>

          {/* Data Science & Analytics */}
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <FaChartLine className="text-4xl text-yellow-500 mx-auto mb-4" />
            <h4 className="text-xl font-semibold mb-2">Data Science & Analytics</h4>
            <p className="text-gray-600">Dive into data analysis and machine learning.</p>
          </div>

          {/* Mobile App Development */}
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <FaMobileAlt className="text-4xl text-indigo-500 mx-auto mb-4" />
            <h4 className="text-xl font-semibold mb-2">Mobile App Development</h4>
            <p className="text-gray-600">Build mobile applications for iOS and Android.</p>
          </div>

          {/* Database Management */}
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <FaDatabase className="text-4xl text-pink-500 mx-auto mb-4" />
            <h4 className="text-xl font-semibold mb-2">Database Management</h4>
            <p className="text-gray-600">Learn to manage and optimize databases.</p>
          </div>
        </div>
        <div className="text-center mt-12">
          <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition duration-300">
            Explore all categories
          </button>
        </div>
      </div>
    </div>
  );
};

export default Categories;