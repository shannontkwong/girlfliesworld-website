import React, { useState } from 'react';
import { DiscussionEmbed } from 'disqus-react';
import { BLOG_POSTS } from '../components/blog';

const CleanBlog = () => {
  const [selectedPost, setSelectedPost] = useState(null);

  const styles = {
    container: {
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      maxWidth: '800px',
      margin: '0 auto',
      padding: '120px 40px 40px 40px',
      backgroundColor: 'white',
      color: '#333',
      lineHeight: '1.5',
      minHeight: '100vh'
    },
    header: {
      marginBottom: '40px',
      display: 'flex',
      alignItems: 'center',
      gap: '15px'
    },
    aviationIcon: {
      width: '60px',
      height: '60px',
      backgroundColor: '#4a90e2',
      borderRadius: '8px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      fontSize: '20px',
      flexShrink: 0
    },
    blogTitleSection: {
      display: 'flex',
      flexDirection: 'column'
    },
    blogTitle: {
      fontSize: '28px',
      fontWeight: 'normal',
      color: '#333',
      margin: '0'
    },
    blogDescription: {
      color: '#666',
      fontSize: '16px',
      margin: '4px 0 0 0'
    },
    posts: {
      margin: 0
    },
    post: {
      marginBottom: '40px',
      paddingBottom: '30px',
      borderBottom: '1px solid #eee'
    },
    postDate: {
      color: '#666',
      fontSize: '14px',
      marginBottom: '8px'
    },
    postTitle: {
      fontSize: '20px',
      color: '#4a90e2',
      cursor: 'pointer',
      margin: '0 0 12px 0',
      fontWeight: 'normal',
      textDecoration: 'none'
    },
    postSummary: {
      color: '#333',
      margin: 0,
      fontSize: '16px',
      lineHeight: '1.4'
    },
    backLink: {
      color: '#4a90e2',
      textDecoration: 'none',
      marginBottom: '20px',
      display: 'inline-block',
      fontSize: '14px'
    },
    articleHeader: {
      marginBottom: '30px'
    },
    articleDate: {
      color: '#666',
      fontSize: '14px',
      marginBottom: '10px'
    },
    articleTitle: {
      fontSize: '32px',
      fontWeight: 'normal',
      color: '#333',
      margin: '0 0 30px 0',
      lineHeight: '1.2'
    },
    articleContent: {
      color: '#333',
      fontSize: '16px',
      lineHeight: '1.6'
    },
    commentsSection: {
      marginTop: '50px',
      paddingTop: '30px',
      borderTop: '1px solid #eee'
    },
    commentsTitle: {
      fontSize: '18px',
      fontWeight: 'normal',
      color: '#333',
      margin: '0 0 20px 0'
    }
  };

  // Simple markdown-like parser
  const parseContent = (content) => {
    const lines = content.split('\n');
    const parsed = [];
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      
      if (line.startsWith('## ')) {
        parsed.push(<h2 key={i} style={{fontSize: '24px', fontWeight: '600', margin: '25px 0 15px 0', color: '#333'}}>{line.slice(3)}</h2>);
      } else if (line.startsWith('# ')) {
        parsed.push(<h1 key={i} style={{fontSize: '28px', fontWeight: '600', margin: '30px 0 20px 0', color: '#333'}}>{line.slice(2)}</h1>);
      } else if (line.startsWith('- ')) {
        const listItems = [];
        let j = i;
        while (j < lines.length && lines[j].startsWith('- ')) {
          const listContent = lines[j].slice(2);
          const boldFormatted = listContent.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
          listItems.push(<li key={j} dangerouslySetInnerHTML={{__html: boldFormatted}} />);
          j++;
        }
        parsed.push(<ul key={i} style={{margin: '15px 0', paddingLeft: '30px'}}>{listItems}</ul>);
        i = j - 1;
      } else if (line.startsWith('> ')) {
        parsed.push(
          <blockquote key={i} style={{
            borderLeft: '4px solid #ddd',
            margin: '20px 0',
            paddingLeft: '20px',
            color: '#666',
            fontStyle: 'italic'
          }}>
            {line.slice(2)}
          </blockquote>
        );
      } else if (line.startsWith('```')) {
        const codeLines = [];
        i++; // Skip opening ```
        while (i < lines.length && !lines[i].startsWith('```')) {
          codeLines.push(lines[i]);
          i++;
        }
        parsed.push(
          <pre key={i} style={{
            backgroundColor: '#f8f8f8',
            padding: '15px',
            borderRadius: '4px',
            overflow: 'auto',
            margin: '20px 0'
          }}>
            <code style={{fontFamily: 'Consolas, Monaco, "Courier New", monospace', fontSize: '14px'}}>
              {codeLines.join('\n')}
            </code>
          </pre>
        );
      } else if (line.trim() === '') {
        parsed.push(<br key={i} />);
      } else {
        let formatted = line;
        formatted = formatted.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        formatted = formatted.replace(/\*(.*?)\*/g, '<em>$1</em>');
        formatted = formatted.replace(/`(.*?)`/g, '<code style="background-color: #f8f8f8; padding: 2px 6px; border-radius: 3px; font-family: Consolas, Monaco, \'Courier New\', monospace; font-size: 14px;">$1</code>');
        formatted = formatted.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" style="color: #4a90e2; text-decoration: none;">$1</a>');
        
        if (formatted.trim()) {
          parsed.push(<p key={i} style={{margin: '0 0 15px 0'}} dangerouslySetInnerHTML={{__html: formatted}} />);
        }
      }
    }
    
    return parsed;
  };

  const handlePostClick = (post) => {
    setSelectedPost(post);
    window.history.pushState({}, '', `/blog/${post.id}`);
  };

  const handleBackClick = () => {
    setSelectedPost(null);
    window.history.pushState({}, '', '/blog');
  };

  // Individual post view
  if (selectedPost) {
    return (
      <div style={styles.container}>
        <a 
          href="#" 
          onClick={(e) => {e.preventDefault(); handleBackClick();}} 
          style={styles.backLink}
          onMouseOver={(e) => e.target.style.textDecoration = 'underline'}
          onMouseOut={(e) => e.target.style.textDecoration = 'none'}
        >
          ← Back to all posts
        </a>

        <article>
          <header style={styles.articleHeader}>
            <div style={styles.articleDate}>{selectedPost.date}</div>
            <h1 style={styles.articleTitle}>{selectedPost.title}</h1>
          </header>
          
          <div style={styles.articleContent}>
            {parseContent(selectedPost.content)}
          </div>
        </article>

        <section style={styles.commentsSection}>
          <h3 style={styles.commentsTitle}>Comments</h3>
          <DiscussionEmbed
            shortname='gfw-1'
            config={{
              url: `${window.location.origin}/blog/${selectedPost.id}`,
              identifier: selectedPost.id,
              title: selectedPost.title,
            }}
          />
        </section>
      </div>
    );
  }

  // Main blog list view
  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <img style={styles.aviationIcon} src='/rss.png'></img>

     
        
        <div style={styles.blogTitleSection}>
          <h1 style={styles.blogTitle}>Shannon Wong Blog</h1>
          <p style={styles.blogDescription}>Musings of an aviator's journey</p>
        </div>
      </header>

      <main style={styles.posts}>
        {BLOG_POSTS.map((post) => (
          <article key={post.id} style={styles.post}>
            <div style={styles.postDate}>{post.date}</div>
            <h2 
              style={styles.postTitle}
              onClick={() => handlePostClick(post)}
              onMouseOver={(e) => {
                e.target.style.color = '#2c5aa0';
                e.target.style.textDecoration = 'underline';
              }}
              onMouseOut={(e) => {
                e.target.style.color = '#4a90e2';
                e.target.style.textDecoration = 'none';
              }}
            >
              {post.title}
            </h2>
            <p style={styles.postSummary}>{post.summary}</p>
          </article>
        ))}
      </main>
    </div>
  );
};

export default CleanBlog;
