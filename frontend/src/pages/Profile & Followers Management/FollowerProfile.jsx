import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getUserById } from '../../service/Profile & Followers Management/AuthService';
import ProfileService from '../../service/Profile & Followers Management/ProfileService';
import FollowerService from '../../service/Profile & Followers Management/FollowService';
import PostService from '../../service/Post-And-Interaction/PostService'; 
import { FollowerPostCard } from './FollowerPostCard';
import { Header } from '../../components/Header';
import { SideBar } from '../../components/SideBar';

export const FollowerProfile = () => {
    const { id } = useParams();
    const myData = JSON.parse(localStorage.getItem('user'));
    const [user, setUser] = useState({});
    const [profileImg, setProfileImg] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [followersCount, setFollowersCount] = useState(0);
    const [followingCount, setFollowingCount] = useState(0);
    const [postCount, setPostCount] = useState(0); // Add postCount state
    const [isFollowing, setIsFollowing] = useState(false);
    const [currentUserId] = useState(myData?.id);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                setLoading(true);
                
                // Fetch user data
                const userResponse = await getUserById(id);
                setUser(userResponse);
                
                // Fetch profile image
                try {
                    const imgResponse = await ProfileService.getProfileImage(id);
                    if (imgResponse) {
                        setProfileImg(imgResponse);
                    }
                } catch (imgError) {
                    console.error('Error fetching profile image:', imgError);
                }
                
                // Fetch followers count
                try {
                    const followers = await FollowerService.getFollowers(id);
                    setFollowersCount(followers.length);
                } catch (followersError) {
                    console.error('Error fetching followers:', followersError);
                }
                
                // Fetch following count
                try {
                    const following = await FollowerService.getFollowing(id);
                    setFollowingCount(following.length);
                } catch (followingError) {
                    console.error('Error fetching following:', followingError);
                }
                
                // Fetch post count
                try {
                    const posts = await PostService.getPostsByUser(id);
                    setPostCount(posts.length);
                } catch (postError) {
                    console.error('Error fetching posts:', postError);
                }
                
                // Check if current user is following this profile
                try {
                    const followStatus = await FollowerService.checkIsFollowing(id, currentUserId);
                    setIsFollowing(followStatus);
                } catch (followStatusError) {
                    console.error('Error checking follow status:', followStatusError);
                }
                
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [id, currentUserId]);

    const handleFollowToggle = async () => {
        try {
            if (isFollowing) {
                await FollowerService.unfollowUser(id, currentUserId);
                setFollowersCount(prev => prev - 1);
            } else {
                await FollowerService.followUser(id, currentUserId);
                setFollowersCount(prev => prev + 1);
            }
            setIsFollowing(!isFollowing);
        } catch (error) {
            console.error('Error toggling follow status:', error);
        }
    };

    if (loading) return (
        <div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
    );

    if (error) return (
        <div className="flex justify-center items-center h-screen">
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                Error: {error.message}
            </div>
        </div>
    );

    return (
      <div>
        <Header />
          <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
            <SideBar />
            <div className="max-w-3xl mx-auto">
                <div className="bg-white rounded-xl shadow-xl overflow-hidden">
                    {/* Profile Cover */}
                    <div className="h-48 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
                    
                    {/* Profile Header */}
                    <div className="relative px-6 sm:px-8 pb-8 -mt-16">
                        <div className="flex flex-col sm:flex-row items-center sm:items-end gap-6">
                            {/* Profile Image */}
                            <div className="relative">
                                {profileImg ? (
                                    <img 
                                        src={profileImg} 
                                        alt={`${user.name}'s profile`}
                                        className="w-32 h-32 sm:w-40 sm:h-40 rounded-full border-4 border-white shadow-lg object-cover"
                                    />
                                ) : (
                                    <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full border-4 border-white shadow-lg bg-gray-200 flex items-center justify-center">
                                        <span className="text-gray-500 text-xl font-medium">No Image</span>
                                    </div>
                                )}
                            </div>
                            
                            {/* Profile Info */}
                            <div className="text-center sm:text-left">
                                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                                    {user.name || 'Unknown User'}
                                </h1>
                                {user.username && (
                                    <p className="text-indigo-600 font-medium">@{user.username}</p>
                                )}
                                {user.bio && (
                                    <p className="mt-2 text-gray-600 max-w-md">{user.bio}</p>
                                )}
                                
                                {/* Stats and Follow Button */}
                                <div className="mt-4 flex flex-wrap items-center gap-4 justify-center sm:justify-start">
                                    <div className="text-center">
                                        <p className="text-xl font-bold text-gray-900">{followersCount}</p>
                                        <p className="text-sm text-gray-500">Followers</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-xl font-bold text-gray-900">{followingCount}</p>
                                        <p className="text-sm text-gray-500">Following</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-xl font-bold text-gray-900">{postCount}</p>
                                        <p className="text-sm text-gray-500">Posts</p>
                                    </div>
                                    
                                    {/* Follow Button */}
                                    {currentUserId !== id && (
                                        <button 
                                            onClick={handleFollowToggle}
                                            className={`px-4 py-2 rounded-full font-medium transition-colors ${
                                                isFollowing 
                                                    ? 'bg-gray-200 text-gray-800 hover:bg-gray-300' 
                                                    : 'bg-indigo-600 text-white hover:bg-indigo-700'
                                            }`}
                                        >
                                            {isFollowing ? 'Following' : 'Follow'}
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    {/* Post sections */}
                    <div className="border-t border-gray-200 px-6 py-4">
                        <FollowerPostCard uid={id} />
                    </div>
                </div>
            </div>
        </div>
      </div>
    );
};