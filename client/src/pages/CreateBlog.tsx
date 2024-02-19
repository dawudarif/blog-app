import { useState } from 'react';
import BlogInput from '../components/blog/BlogInput';

export default function CreateBlog() {
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [cover, setCover] = useState('');
  const [loading, setLoading] = useState(false);

  async function createBlog() {}

  return (
    <div className='flex flex-col items-center justify-center bg-stone-50 w-full max-h-max gap-10'>
      <BlogInput
        headingText='Create Post'
        buttonText='Create'
        title={title}
        setTitle={setTitle}
        summary={summary}
        setSummary={setSummary}
        content={content}
        setContent={setContent}
        setCover={setCover}
        loading={loading}
        onSubmitFn={createBlog}
      />
    </div>
  );
}
