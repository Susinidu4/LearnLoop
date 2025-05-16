import React, { useState } from 'react';
import VideoCommentsAndLikeService from '../service/Like-Comment-Notification-Management/VideoCommentsAndLike';
import { format } from 'date-fns';

export const VideoCommentsPopup = ({ video, user, onClose, onCommentDeleted }) => {
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleAddComment = async () => {
    if (!newComment.trim()) {
      setError('Comment cannot be empty');
      return;
    }

    setLoading(true);
    try {
      await VideoCommentsAndLikeService.addComment(video.id, {
        userId: user.id,
        content: newComment
      });
      setNewComment('');
      setError(null);
      onCommentDeleted();
    } catch (err) {
      setError(err.message || 'Failed to add comment');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteComment = async (commentId) => {
    if (!window.confirm('Are you sure you want to delete this comment?')) return;

    try {
      await VideoCommentsAndLikeService.deleteComment(video.id, commentId);
      onCommentDeleted();
    } catch (err) {
      setError(err.message || 'Failed to delete comment');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-md p-4">
      <div className="w-full max-w-lg max-h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-200 bg-gray-100">
          <h3 className="text-xl font-semibold text-gray-800">
            Comments ({video.comments?.length || 0})
          </h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 transition">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Comments List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5">
          {video.comments?.length === 0 ? (
            <p className="text-center text-gray-500 italic">No comments yet. Be the first to comment!</p>
          ) : (
            video.comments.map(comment => (
              <div key={comment.id} className="flex space-x-4 items-start">
                <div className="h-10 w-10 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center font-bold">
                  {comment.userId.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <p className="font-semibold text-gray-800">
                      User {comment.userId.substring(0, 6)}
                    </p>
                    <span className="text-xs text-gray-500">
                      {format(new Date(comment.commentedAt), 'MMM d, yyyy h:mm a')}
                    </span>
                  </div>
                  <p className="text-gray-700 mt-1 text-sm">{comment.content}</p>
                  {(user.id === comment.userId || user.id === video.userId) && (
                    <button
                      onClick={() => handleDeleteComment(comment.id)}
                      className="text-xs text-red-500 hover:underline mt-1"
                    >
                      Delete
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {/* New Comment Input */}
        <div className="p-4 border-t border-gray-200 bg-gray-50">
          {error && (
            <div className="mb-2 text-sm text-red-600 font-medium">{error}</div>
          )}
          <div className="flex space-x-3">
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write your comment..."
              className="flex-1 px-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
              disabled={loading}
            />
            <button
              onClick={handleAddComment}
              disabled={loading || !newComment.trim()}
              className="px-5 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? 'Posting...' : 'Post'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
