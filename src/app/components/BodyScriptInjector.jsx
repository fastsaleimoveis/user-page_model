import { useEffect, useState } from 'react';

const BodyScriptInjector = ({ scriptContent }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient) {
      // Crie um elemento div para parsear a string
      const container = document.createElement('div');
      container.innerHTML = scriptContent;

      // Itere sobre os filhos e adicione ao final do corpo
      Array.from(container.children).forEach((child) => {
        document.body.appendChild(child);
      });

      return () => {
        // Remova os scripts do corpo quando o componente for desmontado
        Array.from(container.children).forEach((child) => {
          document.body.removeChild(child);
        });
      };
    }
  }, [isClient, scriptContent]);

  return null;
};

export default BodyScriptInjector;