'use client';

import { useEffect } from 'react';

interface GoogleAdsScriptProps {
  gtagId: string;
}

export function GoogleAdsScript({ gtagId }: GoogleAdsScriptProps) {
  useEffect(() => {
    // Verificar se já existe para evitar duplicação
    if (document.querySelector(`script[src*="googletagmanager.com/gtag/js?id=${gtagId}"]`)) {
      return;
    }

    // Criar e adicionar o script de carregamento
    const script1 = document.createElement('script');
    script1.async = true;
    script1.src = `https://www.googletagmanager.com/gtag/js?id=${gtagId}`;
    document.head.appendChild(script1);

    // Criar e adicionar o script de configuração
    const script2 = document.createElement('script');
    script2.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${gtagId}');
    `;
    document.head.appendChild(script2);

    // Cleanup (opcional, mas não necessário já que queremos manter os scripts)
  }, [gtagId]);

  return null;
}

