import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

function normalizeMathDelimiters(text) {
  if (!text) {
    return '';
  }
  return text
    .replace(/\\\\\[/g, '$$')
    .replace(/\\\\\]/g, '$$')
    .replace(/\\\\\(/g, '$')
    .replace(/\\\\\)/g, '$');
}

export default function MathMarkdown({ content }) {
  return (
    <ReactMarkdown
      className="math-markdown"
      remarkPlugins={[remarkGfm, remarkMath]}
      rehypePlugins={[rehypeKatex]}
    >
      {normalizeMathDelimiters(content)}
    </ReactMarkdown>
  );
}