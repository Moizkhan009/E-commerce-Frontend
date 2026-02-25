// import React, { useState, useEffect } from "react";
// // import BlogHero       from "./BlogHero.jsx";
// import BlogHero from "./Bloghero.jsx";
// // import FeaturedPost   from "./FeaturedPost.jsx";
// import FeaturedPost from "./Featuredpost.jsx";
// import PostsGrid from "./Postsgrid.jsx";
// import BlogSidebar from "./Blogsidebar.jsx";
// // import BlogNewsletter from "./Blognewsletter.jsx";
// import BlogNewsletter from "./BlogNewsletter.jsx";
// // import PostsGrid      from "./PostsGrid.jsx";
// // import BlogSidebar    from "./BlogSidebar.jsx";
// // import BlogNewsletter from "./BlogNewsletter.jsx";
// import { Import } from "lucide-react";

// const BlogListingPage = ({ onReadPost }) => {
//   const [searchQuery,     setSearchQuery]     = useState("");
//   const [activeCategory,  setActiveCategory]  = useState("");

//   useEffect(() => {
//     if (!document.getElementById("nest-fonts")) {
//       const link = document.createElement("link");
//       link.id = "nest-fonts"; link.rel = "stylesheet";
//       link.href = "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,400;1,600&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap";
//       document.head.appendChild(link);
//     }
//     document.body.style.margin = "0";
//     document.body.style.background = "#F8FAFC";
//   }, []);

//   const handleSearch   = (q) => setSearchQuery(q);
//   const handleCategory = (c) => setActiveCategory(prev => prev === c ? "" : c);
//   const handleTag      = (t) => setSearchQuery(t);

//   return (
//     <div style={{ fontFamily:"'Plus Jakarta Sans',system-ui,sans-serif", background:"#F8FAFC", minHeight:"100vh" }}>
//       {/* Hero */}
//       <BlogHero onSearch={handleSearch} />

//       {/* Featured post */}
//       <FeaturedPost onReadPost={onReadPost} />

//       {/* Main content: grid + sidebar */}
//       <div style={s.main}>
//         <div style={s.layout}>
//           {/* Posts grid */}
//           <div style={s.gridArea}>
//             <PostsGrid
//               searchQuery={searchQuery}
//               activeCategory={activeCategory}
//               onReadPost={onReadPost}
//             />
//           </div>

//           {/* Sidebar */}
//           <div style={s.sidebarArea}>
//             <BlogSidebar
//               onSearch={handleSearch}
//               onCategory={handleCategory}
//               onTag={handleTag}
//               activeCategory={activeCategory}
//               onReadPost={onReadPost}
//             />
//           </div>
//         </div>
//       </div>

//       {/* Newsletter */}
//       <BlogNewsletter />

//       {/* Responsive styles */}
//       <style>{`
//         * { box-sizing: border-box; }
//         @media (max-width: 1024px) {
//           .blog-layout { flex-direction: column !important; }
//           .blog-sidebar { width: 100% !important; }
//         }
//         @media (max-width: 600px) {
//           .blog-main { padding: 32px 16px !important; }
//         }
//         input::placeholder { color: rgba(100,120,140,.55); }
//       `}</style>
//     </div>
//   );
// };

// const s = {
//   main: { padding:"52px 40px 0", maxWidth:1280, margin:"0 auto" },
//   layout: { display:"flex", gap:32, alignItems:"flex-start", maxWidth:1120, margin:"0 auto" },
//   gridArea: { flex:1, minWidth:0 },
//   sidebarArea: { width:320, flexShrink:0, position:"sticky", top:24 },
// };

// export default BlogListingPage;