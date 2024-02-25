import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import 'highlight.js/styles/atom-one-dark.css';

const modules = {
  syntax: {
    languages: ['javascript', 'python', 'java'], // Supported languages
    defaultLanguage: 'javascript',
  },
  toolbar: [
    [{ header: [1, 2, false] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [
      { list: 'ordered' },
      { list: 'bullet' },
      { indent: '-1' },
      { indent: '+1' },
    ],
    ['link', 'image'],
    ['clean'],
    ['code-block'],
  ],
};
const formats = [
  'header',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
  'code-block',
];

export default function Editor({
  value,
  onChange,
}: {
  value: string;
  onChange: (e: any) => void;
}) {
  return (
    <ReactQuill
      value={value}
      style={{ height: '30rem', background: 'white' }}
      onChange={onChange}
      modules={modules}
      formats={formats}
    />
  );
}
