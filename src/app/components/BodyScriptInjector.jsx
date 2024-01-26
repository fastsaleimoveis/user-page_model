import { useEffect, useState } from 'react';

const BodyScriptInjector = ({ scriptContent }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient) {
      // Remova as tags <script> do conteúdo
      const sanitizedContent = scriptContent.replace(/<\/?script>/g, '');

      // Use dangerouslySetInnerHTML para injetar o código diretamente no JSX
      const scriptElement = document.createElement('script');
      scriptElement.innerHTML = sanitizedContent;

      // Adicione o script ao final do corpo
      document.body.appendChild(scriptElement);

      return () => {
        // Remova o script do corpo quando o componente for desmontado
        document.body.removeChild(scriptElement);
      };
    }
  }, [isClient, scriptContent]);

  return null;
};

export default BodyScriptInjector;