import React, { useState } from 'react';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import GlobalStyle from "../../assets/prototype/GlobalStyle";
import logo2 from "../../assets/images/Logo2.png";
import faqImg from "../../assets/images/faqImg.png";
import { useNavigate } from 'react-router-dom';
import { login } from '../../service/Profile & Followers Management/AuthService'; // Import the login function

export const User_Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [formData, setFormData] = useState({
        userId: '', // This will be used as email for login
        password: '',
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
        // Clear error when user types
        if (error) setError(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
        
        try {
            // Call the login service
            const response = await login(formData.userId, formData.password);
            
            // Handle successful login
            console.log('Login successful:', response);
            
            // Store token and user details if available
            if (response.token) {
                localStorage.setItem('authToken', response.token);
                localStorage.setItem('user', JSON.stringify(response.user));
                
                // Remember me functionality
                if (rememberMe) {
                    localStorage.setItem('rememberedEmail', formData.userId);
                } else {
                    localStorage.removeItem('rememberedEmail');
                }
            }
            
            // Redirect to dashboard or home page
            navigate('/userprofile');
            
        } catch (err) {
            console.error('Login error:', err);
            setError(err.response?.data?.error || 'Login failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    // Rest of your component remains exactly the same
    return (
        <div className="flex w-full min-h-screen bg-[#f8f0e5] relative overflow-hidden">
            {/* All your existing decorative elements */}
            <div className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full bg-[#2F1B06] -translate-x-1/2 -translate-y-3/6"></div>
            <div className="absolute top-0 left-72 w-[400px] h-[400px] rounded-full bg-[#4a2b0f] -translate-x-1/2 -translate-y-4/6"></div>
            <div className="absolute -bottom-40 right-72 w-[400px] h-[400px] rounded-full bg-[#2F1B06] translate-x-1/3 translate-y-1/3 z-20"></div>
            <div className="absolute -bottom-40 right-0 w-[600px] h-[600px] rounded-full bg-[#4a2b0f] translate-x-1/3 translate-y-1/3 z-20"></div>
            
            <main className={`${GlobalStyle.fontPoppins} container mx-auto flex flex-col md:flex-row items-center justify-center px-4 py-8 z-10 relative`}>
                <div className="w-full md:w-1/2 flex flex-col mt-8 items-center justify-center p-8">
                    <img src={logo2} className="w-100 h-auto" alt="" />
                    <img
                        src={faqImg}
                        alt="Character sitting on couch with laptop"
                        className="max-w-full h-auto max-h-[300px] object-contain"
                    />
                </div>
                
                <div className="w-full md:w-1/2 max-w-md">
                    <div className="bg-[#e1ceb5] rounded-3xl p-8 shadow-lg">
                        <h2 className={`${GlobalStyle.headingLarge} text-[#4a2b0f] text-3xl font-bold mb-1`}>Login</h2>
                        <p className="text-[#4a2b0f] text-[16px] mb-6">Glad you're here!</p>
                        
                        {/* Error message display - added this small addition */}
                        {error && (
                            <div className="mb-4 p-2 bg-red-100 text-red-700 rounded-lg text-sm">
                                {error}
                            </div>
                        )}
                        
                        {/* Existing form - only added onSubmit handler */}
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <input
                                    type="text"
                                    name="userId"
                                    placeholder="User Email"
                                    value={formData.userId}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 rounded-lg bg-[#e1ceb5] border border-[#4a2b0f30] focus:outline-none focus:ring-1 focus:ring-[#4a2b0f]"
                                    required
                                />
                            </div>
                            <div className="mb-4 relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    placeholder="Password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 rounded-lg bg-[#e1ceb5] border border-[#4a2b0f30] focus:outline-none focus:ring-1 focus:ring-[#4a2b0f]"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#4a2b0f]"
                                >
                                    {showPassword ? (
                                        <EyeOffIcon size={18} />
                                    ) : (
                                        <EyeIcon size={18} />
                                    )}
                                </button>
                            </div>
                            <div className="mb-6 flex items-center">
                                <input
                                    type="checkbox"
                                    id="remember"
                                    checked={rememberMe}
                                    onChange={() => setRememberMe(!rememberMe)}
                                    className="mr-2 rounded border-[#4a2b0f]"
                                />
                                <label htmlFor="remember" className="text-[#4a2b0f] text-[16px]">
                                    Remember me
                                </label>
                            </div>
                            <button
                                type="submit"
                                className="w-full text-[16px] bg-[#4a2b0f] text-white py-3 rounded-lg font-medium hover:bg-[#3a2208] transition-colors disabled:opacity-50"
                                disabled={isLoading}
                            >
                                {isLoading ? 'Logging in...' : 'Login'}
                            </button>
                        </form>
                        
                        {/* All existing footer elements remain unchanged */}
                        <div className="mt-4">
                            <a href="#" className="text-[#4a2b0f] text-md hover:underline">
                                Forgot password?
                            </a>
                        </div>
                        <div className="flex items-center my-6">
                            <div className="flex-grow border-t border-[#4a2b0f30]"></div>
                            <span className="mx-4 text-[#4a2b0f]">Or</span>
                            <div className="flex-grow border-t border-[#4a2b0f30]"></div>
                        </div>
                        <div className="flex justify-center space-x-6 mb-12">
                            <button className="p-2 rounded-full hover:bg-[#d8c1a6] transition-colors">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="40"
                                    height="40"
                                    viewBox="0 0 24 24"
                                    fill="#4a2b0f"
                                >
                                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                </svg>
                            </button>
                            <button className="p-2 rounded-full hover:bg-[#d8c1a6] transition-colors">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="40"
                                    height="40"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        fill="#4285F4"
                                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                    />
                                    <path
                                        fill="#34A853"
                                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                    />
                                    <path
                                        fill="#FBBC05"
                                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                    />
                                    <path
                                        fill="#EA4335"
                                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};