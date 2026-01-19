import { useEffect, useState } from 'react';

const BodyScriptInjector = ({ scriptContent }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient && scriptContent) {
      // Crie um elemento div para parsear a string
      const container = document.createElement('div');
      container.innerHTML = scriptContent;

      // Armazene referências aos elementos adicionados
      const addedElements = [];

      // Itere sobre os filhos e adicione ao final do corpo
      Array.from(container.children).forEach((child) => {
        const clonedChild = child.cloneNode(true);
        document.body.appendChild(clonedChild);
        addedElements.push(clonedChild);
      });

      return () => {
        // Remova os scripts do corpo quando o componente for desmontado
        addedElements.forEach((element) => {
          if (element && element.parentNode === document.body) {
            try {
              document.body.removeChild(element);
            } catch (error) {
              // Ignora erros se o elemento já foi removido
              console.warn('Erro ao remover elemento do body:', error);
            }
          }
        });
      };
    }
  }, [isClient, scriptContent]);

  return null;
};

export default BodyScriptInjector;