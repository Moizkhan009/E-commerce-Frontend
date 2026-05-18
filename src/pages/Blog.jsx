import React, { useState, useEffect } from "react";
import BlogHero from "../components/BlogComponents/Bloghero.jsx";
import FeaturedPost from "../components/BlogComponents/Featuredpost.jsx";
import PostsGrid from "../components/BlogComponents/Postsgrid.jsx";
import BlogSidebar from "../components/BlogComponents/Blogsidebar.jsx";
import BlogNewsletter from "../components/BlogComponents/Blognewsletter.jsx";
import BlogDetailPage from "../components/BlogComponents/Blogdetailpage.jsx";
// import Header from "../components/header.jsx";
/**
 * BlogPage — Single entry point.
 * Usage: <BlogPage />
 */
const BlogPage = () => {
  const [selectedPost,   setSelectedPost]   = useState(null);
  const [searchQuery,    setSearchQuery]    = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    if (!document.getElementById("nest-fonts")) {
      const link = document.createElement("link");
      link.id   = "nest-fonts";
      link.rel  = "stylesheet";
      link.href = "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,400;1,600&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap";
      document.head.appendChild(link);
    }
    document.body.style.margin     = "0";
    document.body.style.padding    = "0";
    document.body.style.background = "#F8FAFC";
  }, []);

  // Detail view — no back button, no navbar
  if (selectedPost) {
    return <BlogDetailPage post={selectedPost} />;
  }

  // Listing view
  return (
    
    <div style={{ fontFamily: "'Plus Jakarta Sans',system-ui,sans-serif", background: "#F8FAFC", minHeight: "100vh" }}>
      {/* <Header/> */}
      <BlogHero
        onSearch={setSearchQuery}
        onCategory={setActiveCategory}
        activeCategory={activeCategory}
      />
      <FeaturedPost onReadPost={setSelectedPost} />
      <div style={s.container}>
        <div style={s.layout}>
          <div style={s.gridArea}>
            <PostsGrid
              searchQuery={searchQuery}
              activeCategory={activeCategory}
              onReadPost={setSelectedPost}
            />
          </div>
          <div style={s.sidebarArea}>
            <BlogSidebar
              onSearch={setSearchQuery}
              onCategory={setActiveCategory}
              onTag={setSearchQuery}
              activeCategory={activeCategory}
              onReadPost={setSelectedPost}
            />
          </div>
        </div>
      </div>
      <BlogNewsletter />
      <style>{`
        * { box-sizing: border-box; }
        input::placeholder { color: rgba(100,120,140,.5); }
        @media(max-width:1024px){
          .bl-layout { flex-direction: column !important; }
          .bl-sidebar { width: 100% !important; position: static !important; }
        }
        @media(max-width:600px){
          .bl-container { padding: 32px 16px !important; }
        }
      `}</style>
    </div>
  );
};

const s = {
  container:   { padding: "56px 40px 0", maxWidth: 1280, margin: "0 auto" },
  layout:      { display: "flex", gap: 32, alignItems: "flex-start", maxWidth: 1120, margin: "0 auto" },
  gridArea:    { flex: 1, minWidth: 0 },
  sidebarArea: { width: 300, flexShrink: 0, position: "sticky", top: 24 },
};

export default BlogPage;