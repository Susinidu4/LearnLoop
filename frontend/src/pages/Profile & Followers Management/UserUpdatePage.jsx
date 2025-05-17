import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserById, updateUser } from '../../service/Profile & Followers Management/AuthService';
import GlobalStyle from '../../assets/prototype/GlobalStyle';
import { Header } from '../../components/Header';
import { SideBar } from '../../components/SideBar';

export const UserUpdatePage = () => {
  const myData = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: '',
    email: '',
    newPassword: '',
    confirmNewPassword: ''
  });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    message: '',
    isValid: false
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getUserById(myData.id);
        setUser(prev => ({
          ...prev,
          name: userData.name || '',
          email: userData.email || ''
        }));
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch user data');
        setLoading(false);
        console.error(err);
      }
    };

    fetchUser();
  }, [myData.id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser(prev => ({
      ...prev,
      [name]: value
    }));

    // Check password strength when newPassword changes
    if (name === 'newPassword') {
      checkPasswordStrength(value);
    }
  };

  const checkPasswordStrength = (password) => {
    // Reset if empty
    if (!password) {
      setPasswordStrength({
        score: 0,
        message: '',
        isValid: false
      });
      return;
    }

    // Initialize variables
    let score = 0;
    let messages = [];
    let isValid = true;

    // Check length (minimum 8 characters)
    if (password.length < 8) {
      messages.push('Password must be at least 8 characters long');
      isValid = false;
    } else if (password.length >= 12) {
      score += 1;
    }

    // Check for uppercase letters
    if (!/[A-Z]/.test(password)) {
      messages.push('Include at least one uppercase letter');
      isValid = false;
    } else {
      score += 1;
    }

    // Check for lowercase letters
    if (!/[a-z]/.test(password)) {
      messages.push('Include at least one lowercase letter');
      isValid = false;
    } else {
      score += 1;
    }

    // Check for numbers
    if (!/[0-9]/.test(password)) {
      messages.push('Include at least one number');
      isValid = false;
    } else {
      score += 1;
    }

    // Check for special characters
    if (!/[^A-Za-z0-9]/.test(password)) {
      messages.push('Include at least one special character');
      isValid = false;
    } else {
      score += 1;
    }

    // Determine strength message
    let strengthMessage = '';
    if (score === 0) {
      strengthMessage = '';
    } else if (score <= 2) {
      strengthMessage = 'Weak';
    } else if (score <= 3) {
      strengthMessage = 'Moderate';
    } else {
      strengthMessage = 'Strong';
    }

    setPasswordStrength({
      score,
      message: messages.join(' • '),
      isValid: isValid && password.length >= 8
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setSubmitting(true);

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(user.email)) {
      setError('Please enter a valid email address');
      setSubmitting(false);
      return;
    }

    // Only validate passwords if new password is provided
    if (user.newPassword) {
      if (!passwordStrength.isValid) {
        setError('Password does not meet strength requirements: ' + passwordStrength.message);
        setSubmitting(false);
        return;
      }

      if (user.newPassword !== user.confirmNewPassword) {
        setError('New passwords do not match');
        setSubmitting(false);
        return;
      }
    }

    try {
      // Prepare the update data - only include password if it was provided
      const updateData = {
        name: user.name,
        email: user.email,
        ...(user.newPassword && { password: user.newPassword })
      };

      await updateUser(myData.id, updateData);
      
      setSuccess('Profile updated successfully!');
      
      // Update local storage with new user data
      const updatedUserData = { ...myData, name: user.name, email: user.email };
      localStorage.setItem('user', JSON.stringify(updatedUserData));

      // Clear password fields
      setUser(prev => ({
        ...prev,
        newPassword: '',
        confirmNewPassword: ''
      }));

      // Reset password strength
      setPasswordStrength({
        score: 0,
        message: '',
        isValid: false
      });

      // If password was changed, redirect to login after 2 seconds
      if (user.newPassword) {
        setTimeout(() => {
          localStorage.removeItem('user');
          navigate('/userlogin');
        }, 2000);
      }
    } catch (err) {
      setError(
        err.response?.data?.message || 
        err.message || 
        'An unexpected error occurred. Please try again.'
      );
      console.error('Update error:', err);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-lg font-medium text-gray-700">Loading your profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`${GlobalStyle.fontPoppins} bg-[#F7EDE5] min-h-screen pt-24`}>
      <Header />
      <div className="max-w-3xl mx-auto">
        <SideBar />
        <div className="text-center mb-10">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Update Your Profile
          </h1>
          <p className="mt-3 text-xl text-gray-600">
            Keep your information up to date
          </p>
        </div>

        <div className="bg-[#e1ceb5] shadow-xl rounded-lg overflow-hidden">
          <div className="p-6 sm:p-8">
            {error && (
              <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-red-700">{error}</p>
                  </div>
                </div>
              </div>
            )}
            
            {success && (
              <div className="mb-6 bg-green-50 border-l-4 border-green-500 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-green-700">{success}</p>
                  </div>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Full Name
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={user.name}
                      onChange={handleChange}
                      className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-3"
                      placeholder="John Doe"
                      required
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email Address
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                    </div>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={user.email}
                      onChange={handleChange}
                      className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-3"
                      placeholder="you@example.com"
                      required
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
                    New Password (leave blank to keep current)
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <input
                      type="password"
                      id="newPassword"
                      name="newPassword"
                      value={user.newPassword}
                      onChange={handleChange}
                      className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-3"
                      placeholder="••••••••"
                    />
                  </div>
                  {user.newPassword && (
                    <div className="mt-2">
                      <div className="flex items-center">
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div 
                            className={`h-2.5 rounded-full ${
                              passwordStrength.score <= 2 ? 'bg-red-500' :
                              passwordStrength.score <= 3 ? 'bg-yellow-500' :
                              'bg-green-500'
                            }`}
                            style={{ width: `${(passwordStrength.score / 5) * 100}%` }}
                          ></div>
                        </div>
                        <span className="ml-2 text-xs font-medium text-gray-700">
                          {passwordStrength.score === 0 ? '' : 
                           passwordStrength.score <= 2 ? 'Weak' :
                           passwordStrength.score <= 3 ? 'Moderate' : 'Strong'}
                        </span>
                      </div>
                      {passwordStrength.message && (
                        <p className="mt-1 text-xs text-red-600">{passwordStrength.message}</p>
                      )}
                    </div>
                  )}
                </div>

                {user.newPassword && (
                  <div className="sm:col-span-2">
                    <label htmlFor="confirmNewPassword" className="block text-sm font-medium text-gray-700">
                      Confirm New Password
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <input
                        type="password"
                        id="confirmNewPassword"
                        name="confirmNewPassword"
                        value={user.confirmNewPassword}
                        onChange={handleChange}
                        className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-3"
                        placeholder="••••••••"
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className="flex justify-end space-x-4 pt-6">
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className={`inline-flex items-center px-6 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#4a2b0f] hover:bg-white hover:text-[#4a2b0f] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                    submitting ? 'opacity-75 cursor-not-allowed' : ''
                  }`}
                >
                  {submitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Updating...
                    </>
                  ) : (
                    'Update Profile'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="mt-8 text-center text-sm text-gray-600">
          <p>Need help? <a href="#" className="font-medium text-blue-600 hover:text-blue-500">Contact support</a></p>
        </div>
      </div>
    </div>
  );
};