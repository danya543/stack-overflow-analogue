import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

import * as styles from './SnippetCard.module.scss';

export const SnippetCode = ({ language, code }: { language: string; code: string }) => (
  <div className={styles.code}>
    <SyntaxHighlighter
      language={language.toLowerCase()}
      style={vscDarkPlus}
      showLineNumbers
      customStyle={{ background: 'transparent', padding: 0 }}
    >
      {code}
    </SyntaxHighlighter>
  </div>
);
