import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignupBuyer = ({ onToggle }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    pincode: '',
    state: '',
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.(com|in)$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = {};

    // Email validation
    if (!validateEmail(formData.email)) {
      validationErrors.email = 'Invalid email format. Email must contain @ and end with .com or .in';
    }

    // Password validation
    if (!validatePassword(formData.password)) {
      validationErrors.password =
        'Password must be at least 8 characters long, include one uppercase letter, one lowercase letter, one number, and one special character.';
    }

    // Confirm Password validation
    if (formData.password !== formData.confirmPassword) {
      validationErrors.confirmPassword = 'Passwords do not match!';
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Clear errors if no validation errors
    setErrors({});

    try {
      const response = await fetch('http://localhost:5000/SignupBuyer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
          pincode: formData.pincode,
          state: formData.state,
        }),
      });

      const data = await response.text();
      if (data === 'Registration successful') {
        alert('Account created successfully!');
        navigate('/BookGrid');
      } else {
        alert('Registration failed');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div className="justify-center px-4 lg:py-0 w-[500px] sm:px-8 sm:gap-2">
      <div className="w-full bg-[#393E46] rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-2xl text-[#FFD369] tracking-tight font-extrabold mb-4">
            Create a Buyer account
          </h1>
          <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="username" className="block mb-2 text-sm font-medium text-[#FFD369]">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#FFD369] focus:border-[#FFD369] block w-full p-2.5"
                placeholder="Enter your username"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-[#FFD369]">
                Your email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#FFD369] focus:border-[#FFD369] block w-full p-2.5"
                placeholder="name@company.com"
                required
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>
            <div>
              <label htmlFor="password" className="block mb-2 text-sm font-medium text-[#FFD369]">
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#FFD369] focus:border-[#FFD369] block w-full p-2.5"
                required
              />
              {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
            </div>
            <div>
              <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-[#FFD369]">
                Confirm password
              </label>
              <input
                type="password"
                name="confirmPassword"
                id="confirm-password"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#FFD369] focus:border-[#FFD369] block w-full p-2.5"
                required
              />
              {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
            </div>
            {/* Pincode and State inputs */}
            <div className="flex items-start">
              <div>
                <label htmlFor="pincode" className="block mb-2 text-sm font-medium text-[#FFD369]">
                  Pincode
                </label>
                <input
                  type="number"
                  name="pincode"
                  id="pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  placeholder="Enter your pincode"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#FFD369] focus:border-[#FFD369] block w-full p-2.5"
                  required
                />
              </div>
              <div className="ml-[10px]">
                <label htmlFor="state" className="block mb-2 text-sm font-medium text-[#FFD369]">
                  State
                </label>
                <select
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#FFD369] focus:border-[#FFD369] block w-full p-2.5"
                  required
                >
                  <option value="">--Please choose a state--</option>
                  {['Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat',
                   'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra',
                    'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
                    'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal'].map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="terms"
                  aria-describedby="terms"
                  type="checkbox"
                  className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-[#FFD369]"
                  required
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="terms" className="font-light text-white">
                  I accept the <a className="font-medium text-[#FFD369] hover:underline" href="#">Terms and Conditions</a>
                </label>
              </div>
            </div>
            <button
              type="submit"
              className="w-full text-black bg-[#FFD369] hover:bg-[#FFD369] focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Create an account
            </button>
            <p className="text-sm font-light text-white">
              Already have an account? <a className="font-medium text-[#FFD369] hover:underline" onClick={onToggle}>Login here</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupBuyer;