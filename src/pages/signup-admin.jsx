"use client";

import React from 'react';
import { Shield, AtSign, Phone, User, Building, Key, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const InputField = ({ 
  label, 
  type = "text", 
  placeholder, 
  icon: Icon, 
  required = true,
  className = "" ,
  name,
}) => (
  <div className={`flex flex-col space-y-1 ${className}`}>
    <label className="text-sm font-medium text-gray-700">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <div className="relative">
      {Icon && (
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Icon className="h-5 w-5 text-gray-400" />
        </div>
      )}
      <input
        type={type}
        placeholder={placeholder}
        required={required}
        className={`w-full rounded-md border border-gray-300 shadow-sm py-2 
          ${Icon ? 'pl-10 pr-3' : 'px-3'}
          focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none
          text-gray-900 text-sm placeholder-gray-400`}
      />
    </div>
  </div>
);

const AdminSignUpForm = () => {
    const navigate = useNavigate();
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
      <div className="max-w-4xl w-full bg-white rounded-lg shadow-sm p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Shield className="h-12 w-12 text-blue-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Admin Registration</h1>
          <p className="mt-2 text-sm text-gray-600">Create your administrative account</p>
        </div>

        <form className="space-y-8">
          {/* Grid layout for form fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Personal Information Section */}
            <div className="space-y-6">
              <div className="border-b pb-2">
                <h2 className="text-sm font-medium text-gray-700">Personal Details</h2>
              </div>
              <InputField 
                label="Full Name"
                placeholder="Dr. Jane Smith"
                name="name"
                icon={User}
              />
              <InputField 
                label="Phone Number"
                type="tel"
                placeholder="+1 (555) 000-0000"
                name="phone"
                icon={Phone}
              />
              <InputField 
                label="Official Email ID"
                type="email"
                placeholder="jane.smith@institution.edu"
                name="email"
                icon={AtSign}
              />
            </div>

            /* Professional Information Section */}
                  <div className="space-y-6">
                    <div className="border-b pb-2">
                    <h2 className="text-sm font-medium text-gray-700">Professional Details</h2>
                    </div>
                    <div className="space-y-1">
                    <label className="block text-sm font-medium text-gray-700">
                      Designation <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <select
                      name="designation"
                      className="w-full rounded-md border border-gray-300 shadow-sm pl-10 pr-3 py-2
                        focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none
                        text-gray-900 text-sm"
                      required>
                      <option value="">Select designation</option>
                      <option value="placement_officer">Placement Officer</option>
                      <option value="hod">HOD</option>
                      <option value="other">Other</option>
                      </select>
                    </div>
                    </div>
                    <InputField 
                    label="Admin Access Code"
                    type="text"
                    name="accessCode"
                    placeholder="Enter access code if provided"
                    icon={Key}
                    required={false}
                    />
                  </div>
                  </div>

                  {/* Security Section - Full Width */}
          <div className="space-y-6">
            <div className="border-b pb-2">
              <h2 className="text-sm font-medium text-gray-700">Security</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField
                label="username"
                type="text"
                name="username"
                placeholder="johndoe"
              />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <InputField
                label="Password"
                type="password"
                name="password"
                placeholder="••••••••"
              />
              <InputField
                label="Confirm Password"
                type="password"
                name="confirmPassword"
                placeholder="••••••••"
              />
            </div>
          </div>

          {/* Submit Section */}
          <div className="space-y-4">
            <button
              type="submit"
              className="w-full md:w-auto md:px-8 py-2.5 bg-blue-600 text-white font-medium rounded-md 
                hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 
                transition-colors duration-200 flex items-center justify-center"
            >
              Create Admin Account
            </button>
            
            <div className="text-center text-sm text-gray-600">
              Already have an admin account?{' '}
              <button type="button" 
              className="text-blue-600 hover:text-blue-700 font-medium"
              onClick={() => navigate("/")}>
                Sign in
              </button>
            </div>
          </div>
        </form>

        {/* Security Notice */}
        <div className="mt-8 text-center text-xs text-gray-500">
          <p>This is a secure administrator registration portal.</p>
          <p>All actions are logged for security purposes.</p>
        </div>
      </div>
    </div>
  );
};

export default AdminSignUpForm;