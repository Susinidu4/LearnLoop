import React, { useState, useEffect } from 'react';
import FollowerService from '../../service/Profile & Followers Management/FollowService';
import ProfileService from '../../service/Profile & Followers Management/ProfileService';

export const MyFollowers = () => {
    const myData = JSON.parse(localStorage.getItem('user')) || null;
    const [followers, setFollowers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFollowers = async () => {
            try {
                if (myData && myData.id) {
                    const followersData = await FollowerService.getFollowing(myData.id);
                    console.log('Followers data:', followersData); // Debugging line
                    // Add profile images to each follower
                    const followersWithImages = await Promise.all(
                        followersData.map(async (follower) => {
                            try {
                                const imageUrl = await ProfileService.getProfileImage(follower.followINGId);
                                return {
                                    ...follower,
                                    imageUrl: imageUrl || null
                                };
                            } catch (error) {
                                console.error(`Error loading image for user ${follower.followINGId}:`, error);
                                return {
                                    ...follower,
                                    imageUrl: null
                                };
                            }
                        })
                    );
                    setFollowers(followersWithImages);
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchFollowers();
    }, [myData?.id]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center text-red-500 p-4">
                <p>Error loading followers:</p>
                <p>{error}</p>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6">My Followers</h1>
            
            {followers.length === 0 ? (
                <div className="text-center text-gray-500 py-8">
                    You don't have any followers yet.
                </div>
            ) : (
                <div className="space-y-4">
                    {followers.map((follower) => (
                        <div key={follower._id} className="flex items-center bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow">
                            <div className="flex-shrink-0 mr-4">
                                {follower.imageUrl ? (
                                    <img
                                        src={follower.imageUrl}
                                        alt={`${follower.name}'s profile`}
                                        className="h-12 w-12 rounded-full object-cover"
                                    />
                                ) : (
                                    <div className="h-12 w-12 rounded-full bg-gray-300 flex items-center justify-center">
                                        <span className="text-gray-600 font-medium">
                                            {follower.name.charAt(0).toUpperCase()}
                                        </span>
                                    </div>
                                )}
                            </div>
                            <div className="flex-grow">
                                <h3 className="font-medium text-gray-900">{follower.name}</h3>
                                <p className="text-sm text-gray-500">{follower.email}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};