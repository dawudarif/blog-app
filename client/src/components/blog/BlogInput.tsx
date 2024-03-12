import RingLoader from '../loaders/ring';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import Editor from './Editor';

interface BlogInputProps {
  headingText: string;
  buttonText: string;
  onSubmitFn: (e: any) => void;
  title: string;
  setTitle: (value: string) => void;
  summary: string;
  setSummary: (value: string) => void;
  content: string;
  setContent: (value: string) => void;
  setCover: (value: any) => void;
  loading: boolean;
}

const BlogInput: React.FC<BlogInputProps> = ({
  headingText,
  buttonText,
  onSubmitFn,
  title,
  setTitle,
  summary,
  setSummary,
  content,
  setContent,
  setCover,
  loading,
}) => {
  return (
    <form
      className='w-[80%] sm:w-full xs:w-full px-2 gap-2 flex flex-col mt-10 mb-20'
      onSubmit={onSubmitFn}
    >
      <h1 className='text-center text-3xl font-bold my-4 sm:text-2xl xs:text-2xl'>
        {headingText}
      </h1>
      <Input
        placeholder='Enter Title'
        type='text'
        className='text-base'
        required
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Input
        placeholder='Enter Summary'
        type='text'
        className='text-base'
        value={summary}
        onChange={(e) => setSummary(e.target.value)}
      />
      <div className='grid w-full max-w-sm items-center gap-1.5'>
        <Input
          id='cover'
          type='file'
          required
          accept='image/*'
          onChange={(e) => setCover(e.target.files)}
        />
      </div>
      <div className='mb-8'>
        <Editor value={content} onChange={setContent} />
      </div>
      <Button
        variant='default'
        className='w-full mt-4 xs:mt-10 sm:mt-10 '
        type='submit'
        disabled={loading}
      >
        {loading ? <RingLoader size={25} color='white' /> : <>{buttonText}</>}
      </Button>
    </form>
  );
};
export default BlogInput;
