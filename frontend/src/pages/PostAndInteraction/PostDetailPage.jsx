import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PostService from "../../service/Post-And-Interaction/PostService";
import { getUserById } from "../../service/Profile & Followers Management/AuthService";
import GlobalStyle from "../../assets/prototype/GlobalStyle";
import { Header } from "../../components/Header";
import { SideBar } from "../../components/SideBar";
import { MdEdit, MdDelete } from "react-icons/md";
import NotificationService from "../../service/Like-Comment-Notification-Management/Notification";
import ProfileService from "../../service/Profile & Followers Management/ProfileService";

export const PostDetailPage = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editedCommentContent, setEditedCommentContent] = useState("");
  const [profileImages, setProfileImages] = useState({});

  // Safely retrieve the logged-in user and their ID
  const loggedInUser = JSON.parse(localStorage.getItem("user"));
  const loggedInUserId = loggedInUser ? loggedInUser.id : null;

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const fetchedPost = await PostService.getPostById(postId);
        setPost(fetchedPost);

        // Get user details and profile image
        const userData = await getUserById(fetchedPost.userId);
        setUser(userData);

        // Fetch profile image
        const imageUrl = await ProfileService.getProfileImage(
          fetchedPost.userId
        );
        setProfileImages((prev) => ({
          ...prev,
          [fetchedPost.userId]: imageUrl,
        }));

        setComments(fetchedPost.comments || []);
      } catch (err) {
        setError("Failed to load post details");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [postId]);

  const handleCommentSubmit = async () => {
    if (!newComment.trim()) return;
    console.log("Sender ID:", loggedInUserId); // Log senderId

    try {
      const response = await fetch(
        `http://localhost:5000/api/post/${postId}/comments`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: loggedInUserId,
            content: newComment.trim(),
          }),
        }
      );

      if (response.ok) {
        const updatedPost = await response.json();
        setPost(updatedPost);
        setComments(updatedPost.comments || []);
        setNewComment("");
        const receiverId = updatedPost.userId || post?.userId;
        console.log("Receiver ID inside:", receiverId);
        if (receiverId && receiverId !== loggedInUserId) {
          await NotificationService.sendNotification({
            postId: postId,
            senderUserId: loggedInUserId,
            receiverUserId: receiverId,
            type: "COMMENT",
            message: `${
              loggedInUser?.name || "Someone"
            } commented on your post`,
          });
        }
      } else {
        console.error("Failed to post comment");
      }
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/post/${postId}/comments/${commentId}`,
        { method: "DELETE" }
      );

      if (response.ok) {
        const updatedPost = await response.json();
        setPost(updatedPost);
        setComments(updatedPost.comments || []);
      } else {
        console.error("Failed to delete comment");
      }
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  const handleEditComment = async (commentId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/post/${postId}/comments/${commentId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ content: editedCommentContent }),
        }
      );

      if (response.ok) {
        const updatedPost = await response.json();
        setPost(updatedPost);
        setComments(updatedPost.comments || []);
        setEditingCommentId(null);
        setEditedCommentContent("");
      } else {
        console.error("Failed to update comment");
      }
    } catch (error) {
      console.error("Error updating comment:", error);
    }
  };

  if (loading)
    return <div className="text-center mt-20 text-lg">Loading post...</div>;
  if (error)
    return <div className="text-center mt-20 text-red-600">{error}</div>;

  return (
    <div className="flex min-h-screen items-center justify-center">
      <SideBar />
      <div className="flex flex-col w-full ml-16">
        <Header />
        <div
          className={`${GlobalStyle.fontPoppins} bg-[#F7EDE5] min-h-screen pt-24`}
        >
          <main className="p-6">
            <div className={`${GlobalStyle.countBarSubTopicContainer} pt-2`}>
              <div className="bg-[#CFB397] shadow-md rounded-lg w-full max-w-4xl mx-auto mb-8 p-8">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#8B6F5A] overflow-hidden">
                      {profileImages[post.userId] ? (
                        <img
                          src={profileImages[post.userId]}
                          alt={`${user.name}'s profile`}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-white">
                          {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                        </div>
                      )}
                    </div>
                    <h1 className="text-lg font-semibold text-gray-800">
                      {user.name || `User ${post.userId}`}
                    </h1>
                  </div>
                </div>

                <p className="text-gray-700 text-base mb-6">
                  {post.description}
                </p>

                {post.mediaUrls?.length > 0 && (
                  <div className="flex justify-center gap-6 mb-6">
                    {post.mediaUrls.map((url, i) => (
                      <div
                        key={i}
                        className="w-80 h-80 rounded-xl overflow-hidden"
                      >
                        <img
                          src={url}
                          alt={`Post media ${i}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex gap-8 mt-6">
                  <div className="flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="red"
                      viewBox="0 0 24 24"
                      stroke="none"
                      className="w-7 h-7"
                    >
                      <path d="M21.752 6.318a5.753 5.753 0 00-9.317-1.618L12 5.06l-.435-.36A5.753 5.753 0 002.248 6.318c-1.272 2.232-.38 5.104 1.523 6.947L12 21.75l8.23-8.485c1.903-1.843 2.795-4.715 1.522-6.947z" />
                    </svg>
                    <span className="text-sm">{post.likes?.length || 0}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-7 h-7"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 12l.084-.376a9.016 9.016 0 011.676-3.093A9.015 9.015 0 0112 3.75c4.478 0 8.214 3.29 8.91 7.583.066.4.09.808.09 1.217 0 4.28-3.53 7.75-7.89 7.75a8.09 8.09 0 01-2.939-.557c-.387-.144-.823-.083-1.146.158l-2.178 1.61a.75.75 0 01-1.18-.63v-2.614c0-.292-.115-.572-.318-.78a8.963 8.963 0 01-2.289-4.53L2.25 12z"
                      />
                    </svg>
                    <span className="text-sm">
                      {post.comments?.length || 0}
                    </span>
                  </div>
                </div>

                <div className="mt-6">
                  <div className="h-[200px] overflow-y-scroll bg-[#8B6F5A] p-4 rounded-lg">
                    {comments.map((comment) => {
                      const isCommentOwner = comment.userId === loggedInUserId;
                      const isPostOwner = post.userId === loggedInUserId;

                      return (
                        <div
                          key={comment.id}
                          className="flex justify-between items-center bg-[#D9C3AC] rounded-lg p-4 mb-6 min-h-[40px]"
                        >
                          <div className="flex-grow ml-4">
                            {editingCommentId === comment.id ? (
                              <div className="flex flex-col gap-2">
                                <input
                                  type="text"
                                  value={editedCommentContent}
                                  onChange={(e) =>
                                    setEditedCommentContent(e.target.value)
                                  }
                                  className="border rounded p-1"
                                />
                                <div className="flex gap-2">
                                  <button
                                    className="text-sm bg-[#8B5E3C] text-white px-2 py-1 rounded"
                                    onClick={() =>
                                      handleEditComment(comment.id)
                                    }
                                  >
                                    Save
                                  </button>
                                  <button
                                    className="text-sm text-black border px-2 py-1 rounded"
                                    onClick={() => setEditingCommentId(null)}
                                  >
                                    Cancel
                                  </button>
                                </div>
                              </div>
                            ) : (
                              <>
                                <p className="font-medium text-gray-800 break-words">
                                  {comment.content}
                                </p>
                                <p className="text-xs text-gray-600 mt-1">
                                  on{" "}
                                  {new Date(
                                    comment.commentedAt
                                  ).toLocaleString()}
                                </p>
                              </>
                            )}
                          </div>

                          {editingCommentId !== comment.id && (
                            <div className="flex items-center gap-3">
                              <button
                                className={`text-[#8B5E3C] ${
                                  !isCommentOwner ? "opacity-50" : ""
                                }`}
                                onClick={() => {
                                  if (isCommentOwner) {
                                    setEditingCommentId(comment.id);
                                    setEditedCommentContent(comment.content);
                                  }
                                }}
                                disabled={!isCommentOwner}
                              >
                                <MdEdit />
                              </button>
                              <button
                                className={`text-[#8B5E3C] ${
                                  !isCommentOwner && !isPostOwner
                                    ? "opacity-50"
                                    : ""
                                }`}
                                onClick={() => {
                                  if (isCommentOwner || isPostOwner) {
                                    handleDeleteComment(comment.id);
                                  }
                                }}
                                disabled={!isCommentOwner && !isPostOwner}
                              >
                                <MdDelete />
                              </button>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  <div className="flex items-center gap-3 mt-4">
                     <div className="w-10 h-10 rounded-full bg-[#8B6F5A] overflow-hidden">
    {profileImages[loggedInUserId] ? (
      <img 
        src={profileImages[loggedInUserId]} 
        alt={`Your profile`}
        className="w-full h-full object-cover"
      />
    ) : (
      <div className="w-full h-full flex items-center justify-center text-white">
        {loggedInUser?.name ? loggedInUser.name.charAt(0).toUpperCase() : 'Y'}
      </div>
    )}
  </div>
                    <input
                      type="text"
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="Write a comment..."
                      className="flex-grow border rounded-lg p-2"
                    />
                    <div className="flex gap-4">
                      <button
                        className={`${GlobalStyle.buttonPrimary} rounded-lg`}
                        onClick={handleCommentSubmit}
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};
