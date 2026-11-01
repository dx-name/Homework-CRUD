import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:7070/posts')
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Загрузка...</p>;

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '40px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '16px', margin: '24px' }}>
        <h1>Все посты</h1>
      </div>
      <Link to="/posts/new" className="btn" style={{ padding: '5px 16px', background: '#007bff', color: '#fff', textDecoration: 'none', borderRadius: '6px' }}>
        Создать пост
      </Link>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '16px', marginTop: '24px' }}>
        {posts.length === 0 ? (
          <p>Постов пока нет.</p>
        ) : (
          posts.map((post: any) => (
            <Link
              key={post.id}
              to={`/posts/${post.id}`}
              style={{ display: 'block', border: '1px solid #ddd', padding: '16px', borderRadius: '8px', textDecoration: 'none', color: '#333', transition: 'box-shadow 0.2s' }}
              onMouseEnter={(e) => (e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)')}
              onMouseLeave={(e) => (e.currentTarget.style.boxShadow = 'none')}
            >
              <h3 style={{ margin: 0 }}>{post.content || 'Без заголовка'}</h3>
              <p style={{ color: '#666', margin: '8px 0 0', fontSize: '0.9rem' }}>
                ID: {post.id}, создано: {new Date(post.created).toLocaleString()}
              </p>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}

export default HomePage;



