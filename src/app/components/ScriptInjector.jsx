import { useEffect } from 'react';

const ScriptInjector = ({ scriptContent }) => {
  useEffect(() => {
    // Cria um elemento div para parsear a string
    const container = document.createElement('div');
    container.innerHTML = scriptContent;

    // Itera sobre os filhos e adiciona ao head
    Array.from(container.children).forEach((child) => {
      document.head.appendChild(child.cloneNode(true));
    });

    return () => {
      // Remove os scripts ao desmontar o componente
      Array.from(container.children).forEach((child) => {
        document.head.removeChild(child);
      });
    };
  }, [scriptContent]);

  return null;
};

export default ScriptInjector;