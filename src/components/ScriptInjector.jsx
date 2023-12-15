import { useEffect } from 'react';

const ScriptInjector = ({ scriptContent }) => {
  useEffect(() => {
    const script = document.createElement('script');
    // Remova as tags <script> do conteúdo
    const sanitizedContent = scriptContent.replace(/<\/?script>/g, '');
    script.innerHTML = sanitizedContent;
    document.head.appendChild(script);
    return () => {
      document.head.removeChild(script);
    };
  }, [scriptContent]);

  return null;
};

export default ScriptInjector;