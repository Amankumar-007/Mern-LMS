import React from 'react';
import { BookOpen, Users, Award, Clock, CheckCircle, Globe } from 'lucide-react';

function About() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Hero Section */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-4xl font-bold text-gray-900 text-center mb-4">
            About EduLearn Pro
          </h1>
          <p className="text-xl text-gray-600 text-center max-w-3xl mx-auto">
            Founded by <span className="font-semibold text-indigo-600">Aman</span>, we're transforming online education through innovative learning solutions.
          </p>
        </div>
      </div>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard
            icon={<BookOpen className="w-8 h-8 text-indigo-600" />}
            title="Comprehensive Courses"
            description="Access a wide range of courses designed by industry experts"
          />
          <FeatureCard
            icon={<Users className="w-8 h-8 text-indigo-600" />}
            title="Interactive Learning"
            description="Engage with peers and instructors in real-time discussions"
          />
          <FeatureCard
            icon={<Award className="w-8 h-8 text-indigo-600" />}
            title="Certified Programs"
            description="Earn recognized certificates upon course completion"
          />
          <FeatureCard
            icon={<Clock className="w-8 h-8 text-indigo-600" />}
            title="Flexible Schedule"
            description="Learn at your own pace with 24/7 course access"
          />
          <FeatureCard
            icon={<CheckCircle className="w-8 h-8 text-indigo-600" />}
            title="Quality Content"
            description="Curated content meeting industry standards"
          />
          <FeatureCard
            icon={<Globe className="w-8 h-8 text-indigo-600" />}
            title="Global Community"
            description="Join learners from around the world"
          />
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-indigo-700 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <StatCard number="50+" text="Courses" />
            <StatCard number="10k+" text="Students" />
            <StatCard number="95%" text="Satisfaction" />
            <StatCard number="24/7" text="Support" />
          </div>
        </div>
      </div>

      {/* Mission Statement */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Our Mission</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto text-center">
            At EduLearn Pro, we believe in making quality education accessible to everyone. 
            Our platform combines cutting-edge technology with expert instruction to create 
            an engaging learning experience that empowers students to achieve their goals.
          </p>
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

function StatCard({ number, text }) {
  return (
    <div className="text-white">
      <div className="text-4xl font-bold mb-2">{number}</div>
      <div className="text-indigo-100">{text}</div>
    </div>
  );
}

export default About;