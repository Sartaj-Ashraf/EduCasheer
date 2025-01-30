import React from 'react';
import { BiTime } from 'react-icons/bi';
import { FiVideo } from 'react-icons/fi';
import { HiOutlineChevronRight } from 'react-icons/hi';

const CourseCard = ({ course }) => (
  <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
    <div className={`rounded-lg mb-4 p-4 ${course.bgColor}`}>
      <img src={course.imageUrl} alt={course.title} className="w-full h-32 object-contain" />
    </div>
    
    <div className="flex items-center gap-2 mb-2">
      <span className="text-sm px-3 py-1 rounded-full bg-gray-100">{course.level}</span>
      <div className="flex items-center text-sm text-gray-500 gap-1">
        <FiVideo className="w-4 h-4" />
        <span>{course.videos} videos</span>
      </div>
      <div className="flex items-center text-sm text-gray-500 gap-1">
        <BiTime className="w-4 h-4" />
        <span>{course.hours} hours</span>
      </div>
    </div>
    
    <h3 className="font-semibold text-lg mb-4">{course.title}</h3>
    
    <div className="flex justify-between items-center mb-4">
      <div className="flex items-center gap-2">
        <img src={course.instructor.avatar} alt={course.instructor.name} 
          className="w-8 h-8 rounded-full" />
        <span className="text-sm text-gray-600">{course.instructor.name}</span>
      </div>
    </div>
    
    <div className="flex items-center justify-between">
      <div>
        <span className="text-lg font-bold text-blue-600">${course.price}</span>
        <span className="text-sm text-gray-400 line-through ml-2">${course.originalPrice}</span>
      </div>
    </div>
  </div>
);

const PopularCourses = () => {
  const courses = [
    {
      title: "Web development with PHP and MySQL",
      level: "Beginner",
      videos: 95,
      hours: "7.50",
      price: "199.49",
      originalPrice: "299.00",
      bgColor: "bg-blue-50",
      imageUrl: "/api/placeholder/240/160",
      instructor: {
        name: "Billy Vasquez",
        avatar: "/api/placeholder/32/32"
      }
    },
    {
      title: "Digital marketing essentials",
      level: "Advanced",
      videos: 85,
      hours: "5.0",
      price: "149.00",
      originalPrice: "199.00",
      bgColor: "bg-yellow-50",
      imageUrl: "/api/placeholder/240/160",
      instructor: {
        name: "Dennis Barrett",
        avatar: "/api/placeholder/32/32"
      }
    },
    {
      title: "Project management fundamentals",
      level: "Mixed",
      videos: 82,
      hours: "7.50",
      price: "249.99",
      originalPrice: "349.99",
      bgColor: "bg-purple-50",
      imageUrl: "/api/placeholder/240/160",
      instructor: {
        name: "Jacqueline Miller",
        avatar: "/api/placeholder/32/32"
      }
    }
  ];

  return (
    <div className="">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold">
          Most <span className="text-red-500">Popular</span> Courses
        </h2>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2">
          View all courses
          <HiOutlineChevronRight className="w-4 h-4" />
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course, index) => (
          <CourseCard key={index} course={course} />
        ))}
      </div>
    </div>
  );
};

export default PopularCourses;