import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

function PostPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [post, setPost] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [newContent, setNewContent] = useState('');

  useEffect(() => {
    if (!id) return;
    fetch(`http://localhost:7070/posts/${id}`)
      .then((res) => res.json())
      .then((data) => {
        // Твой server.js возвращает { post: {...} }
        const foundPost = data.post;
        setPost(foundPost);
        setNewContent(foundPost?.content || '');
      })
      .catch(console.error);
  }, [id]);

  if (!post) return <p>Загрузка или пост не найден...</p>;

  const handleDelete = async () => {
    const confirmDelete = window.confirm('Удалить этот пост?');
    if (!confirmDelete) return;

    await fetch(`http://localhost:7070/posts/${post.id}`, { method: 'DELETE' });
    navigate('/');
  };

  const handleSave = async () => {
    await fetch(`http://localhost:7070/posts/${post.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: newContent }),
    });
    setIsEditing(false);
    setPost({ ...post, content: newContent });
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      {isEditing ? (
        <div>
          <h2>Редактирование поста</h2>
          <textarea
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
            style={{ width: '100%', height: '180px', padding: '12px', boxSizing: 'border-box', marginBottom: '16px' }}
            required
          />
          <div>
            <button onClick={handleSave} style={{ padding: '10px 20px', background: '#007bff', color: '#fff', border: 'none', borderRadius: '6px', marginRight: '8px' }}>
              Сохранить
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              style={{ padding: '10px 20px', background: 'transparent', color: '#555', border: '1px solid #ccc', borderRadius: '6px' }}
            >
              Отмена
            </button>
          </div>
        </div>
      ) : (
        <div>
          <h1>{post.content}</h1>
          <p><strong>ID:</strong> {post.id}</p>
          <p><strong>Дата:</strong> {new Date(post.created).toLocaleString()}</p>

          <div style={{ marginTop: '24px', display: 'flex', gap: '10px' }}>
            <button onClick={() => setIsEditing(true)} style={{ padding: '10px 20px', background: '#ffc107', color: '#000', border: 'none', borderRadius: '6px' }}>
              Редактировать
            </button>
            <button onClick={handleDelete} style={{ padding: '10px 20px', background: '#dc3545', color: '#fff', border: 'none', borderRadius: '6px' }}>
              Удалить
            </button>
            <button onClick={() => navigate('/')} style={{ padding: '10px 20px', background: 'transparent', color: '#555', border: '1px solid #ccc', borderRadius: '6px' }}>
              Назад
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default PostPage;
