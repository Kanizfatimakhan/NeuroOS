import React, { useState } from 'react';
import Navbar from '../components/landing/Navbar';
import Footer from '../components/landing/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Heart, Share2, Globe, Terminal } from 'lucide-react';
import useOsStore from '../store/osStore';

const initialPosts = [
  { id: 1, author: "dev_ninja", time: "2h ago", title: "My custom PyGame Agent config", likes: 124, comments: 18, isLiked: false },
  { id: 2, author: "ui_queen", time: "5h ago", title: "Dark Neon Theme - Released!", likes: 89, comments: 5, isLiked: false },
  { id: 3, author: "sysadmin_bob", time: "1d ago", title: "Automating Docker deployments via NeuroOS Terminal", likes: 210, comments: 42, isLiked: false },
];

const Community = () => {
  const theme = useOsStore(state => state.theme);
  const [posts, setPosts] = useState(initialPosts);
  const [newPostText, setNewPostText] = useState("");

  const handlePost = () => {
    if (!newPostText.trim()) return;

    const newPost = {
      id: Date.now(),
      author: "you",
      time: "Just now",
      title: newPostText,
      likes: 0,
      comments: 0,
      isLiked: false
    };

    setPosts([newPost, ...posts]);
    setNewPostText("");
  };

  const toggleLike = (id) => {
    setPosts(posts.map(post => {
      if (post.id === id) {
        const isLiked = !post.isLiked;
        return {
          ...post,
          isLiked,
          likes: isLiked ? post.likes + 1 : post.likes - 1
        };
      }
      return post;
    }));
  };

  return (
    <div className={`min-h-screen w-full bg-bg-dark text-text-main overflow-x-hidden flex flex-col theme-${theme}`}>
      <Navbar />
      <main className="flex-1 pt-32 pb-24 relative">
        <div className="absolute top-1/4 left-0 w-full max-w-3xl h-[400px] bg-neon-blue/5 blur-[120px] rounded-full pointer-events-none"></div>
        
        <div className="max-w-6xl mx-auto px-6 relative z-10 flex flex-col md:flex-row gap-12">
          {/* Main Feed */}
          <div className="flex-1">
            <div className="mb-12">
              <h1 className="text-4xl font-bold mb-4 tracking-tight">Community Hub</h1>
              <p className="text-text-muted text-lg">Discuss, share plugins, and connect with other NeuroAgents developers.</p>
            </div>

            {/* Create Post */}
            <div className="bg-panel border border-glass-border p-6 rounded-2xl mb-8 flex gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-neon-blue to-neon-purple flex-shrink-0"></div>
              <div className="flex-1">
                <input 
                  type="text" 
                  value={newPostText}
                  onChange={(e) => setNewPostText(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handlePost()}
                  placeholder="Share a configuration, theme, or ask a question..." 
                  className="w-full bg-glass border border-glass-border rounded-xl py-3 px-4 mb-3 focus:outline-none focus:border-neon-blue/50 text-text-main"
                />
                <div className="flex justify-between items-center">
                  <div className="flex gap-2">
                    <button className="p-2 text-text-muted hover:text-neon-blue hover:bg-glass rounded-lg cursor-pointer transition-colors"><Terminal className="w-5 h-5" /></button>
                    <button className="p-2 text-text-muted hover:text-neon-blue hover:bg-glass rounded-lg cursor-pointer transition-colors"><Globe className="w-5 h-5" /></button>
                  </div>
                  <button 
                    onClick={handlePost}
                    disabled={!newPostText.trim()}
                    className={`px-6 py-2 rounded-lg font-bold transition-all ${
                      newPostText.trim() 
                        ? 'bg-neon-blue text-bg-dark hover:brightness-110 cursor-pointer shadow-md' 
                        : 'bg-glass text-text-muted cursor-not-allowed border border-glass-border'
                    }`}
                  >
                    Post
                  </button>
                </div>
              </div>
            </div>

            {/* Feed Posts */}
            <div className="space-y-6">
              <AnimatePresence>
                {posts.map((post) => (
                  <motion.div 
                    key={post.id}
                    initial={{ opacity: 0, y: -20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    className="bg-glass border border-glass-border p-6 rounded-2xl hover:bg-panel transition-colors"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`w-10 h-10 rounded-full ${post.author === 'you' ? 'bg-gradient-to-tr from-neon-blue to-neon-purple' : 'bg-gray-600'}`}></div>
                      <div>
                        <h5 className="font-bold text-sm">@{post.author}</h5>
                        <span className="text-xs text-text-muted">{post.time}</span>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold mb-4">{post.title}</h3>
                    <div className="flex gap-6 text-text-muted text-sm font-medium">
                      <button 
                        onClick={() => toggleLike(post.id)}
                        className={`flex items-center gap-2 transition-colors cursor-pointer ${
                          post.isLiked ? 'text-neon-purple' : 'hover:text-neon-purple'
                        }`}
                      >
                        <Heart className={`w-4 h-4 ${post.isLiked ? 'fill-neon-purple' : ''}`} /> 
                        {post.likes}
                      </button>
                      <button className="flex items-center gap-2 hover:text-neon-blue cursor-pointer transition-colors">
                        <MessageCircle className="w-4 h-4" /> {post.comments}
                      </button>
                      <button className="flex items-center gap-2 hover:text-text-main cursor-pointer transition-colors">
                        <Share2 className="w-4 h-4" /> Share
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="w-full md:w-80">
            <div className="bg-panel border border-glass-border p-6 rounded-2xl mb-6">
              <h3 className="font-bold text-lg mb-4">Trending Tags</h3>
              <div className="flex flex-wrap gap-2">
                {['#themes', '#agents', '#bash', '#react', '#python', '#showcase'].map(tag => (
                  <span key={tag} className="px-3 py-1 bg-glass border border-glass-border rounded-lg text-xs font-medium text-neon-blue cursor-pointer hover:bg-neon-blue/10">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="bg-panel border border-glass-border p-6 rounded-2xl">
              <h3 className="font-bold text-lg mb-4">Top Contributors</h3>
              <ul className="space-y-4">
                {['alex_coder', 'sarah_ux', 'byte_master'].map((user) => (
                  <li key={user} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gray-500"></div>
                    <span className="text-sm font-medium">@{user}</span>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Community;
