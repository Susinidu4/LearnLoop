// src/components/PostsGallery.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Container,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  TextField,
  MenuItem,
  Box,
  IconButton,
  Dialog,
  DialogContent
} from '@mui/material';
import { Search, FilterAlt, Close } from '@mui/icons-material';

export const PostsGallery = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [categories, setCategories] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [open, setOpen] = useState(false);

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/posts-interaction');
        setPosts(response.data || []);
        
        // Extract unique categories
        const uniqueCategories = [...new Set(
          response.data
            .filter(post => post?.category)
            .map(post => post.category)
        )];
        setCategories(uniqueCategories);
      } catch (error) {
        console.error('Error fetching posts:', error);
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const filteredPosts = posts.filter(post => {
    if (!post) return false;
    
    const description = post.description ? post.description.toLowerCase() : '';
    const category = post.category || '';
    const search = searchTerm.toLowerCase();
    
    const matchesSearch = description.includes(search);
    const matchesCategory = categoryFilter === '' || category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4" component="h1">
          Community Posts Gallery
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 2 }}>
          <TextField
            variant="outlined"
            size="small"
            placeholder="Search posts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <Search sx={{ color: 'action.active', mr: 1 }} />
              ),
            }}
          />
          
          <TextField
            select
            size="small"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            InputProps={{
              startAdornment: (
                <FilterAlt sx={{ color: 'action.active', mr: 1 }} />
              ),
            }}
            sx={{ minWidth: 120 }}
          >
            <MenuItem value="">
              All Categories
            </MenuItem>
            {categories.map((category) => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </TextField>
        </Box>
      </Box>

      {filteredPosts.length === 0 ? (
        <Typography variant="body1" align="center" sx={{ mt: 4 }}>
          No posts found matching your criteria.
        </Typography>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
          gap: '20px',
          padding: '10px'
        }}>
          {filteredPosts.map((post) => (
            <Card key={post?.id || Math.random()} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              {Array.isArray(post?.mediaUrls) && post.mediaUrls.length > 0 && (
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: post.mediaUrls.length > 1 ? 'repeat(2, 1fr)' : '1fr',
                  gap: '4px',
                  padding: '4px'
                }}>
                  {post.mediaUrls.map((url, index) => (
                    <img
                      key={index}
                      src={url}
                      alt={`Post ${index}`}
                      style={{
                        width: '100%',
                        height: '120px',
                        objectFit: 'cover',
                        cursor: 'pointer',
                        borderRadius: '4px'
                      }}
                      onClick={() => handleImageClick(url)}
                    />
                  ))}
                </div>
              )}
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {post?.category || 'Uncategorized'}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {post?.description 
                    ? (post.description.length > 100 
                        ? `${post.description.substring(0, 100)}...` 
                        : post.description)
                    : 'No description available'}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Posted on: {post?.createdAt ? new Date(post.createdAt).toLocaleDateString() : 'Unknown date'}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Image preview dialog */}
      <Dialog open={open} onClose={handleClose} maxWidth="md">
        <DialogContent>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <Close />
          </IconButton>
          <img 
            src={selectedImage} 
            alt="Preview" 
            style={{ 
              width: '100%', 
              height: 'auto',
              maxHeight: '80vh',
              objectFit: 'contain' 
            }} 
          />
        </DialogContent>
      </Dialog>
    </Container>
  );
};