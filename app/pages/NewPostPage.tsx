import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function NewPostPage() {
  const navigate = useNavigate();
  const [content, setContent] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:7070/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: 0, content }),
      });

      if (res.ok) {
        navigate('/');
      } else {
        alert('Ошибка создания поста');
      }
    } catch (err) {
      console.error(err);
      alert('Ошибка сети');
    }
  };

  return (
    <div style={{ maxWidth: '500px', margin: '0 auto', padding: '20px' }}>
      <h2>Новый пост</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Введите текст поста..."
          rows={6}
          style={{ width: '100%', padding: '12px', marginBottom: '16px', boxSizing: 'border-box' }}
          required
        />
        <button type="submit" style={{ padding: '10px 20px', background: '#28a745', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
          Опубликовать
        </button>
        <button
          type="button"
          onClick={() => navigate('/')}
          style={{ padding: '10px 20px', marginLeft: '10px', background: 'transparent', color: '#555', border: '1px solid #ccc', borderRadius: '6px', cursor: 'pointer' }}
        >
          Отмена
        </button>
      </form>
    </div>
  );
}

export default NewPostPage;
