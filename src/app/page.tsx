import Head from 'next/head';
import { redirect } from 'next/navigation';

export default async function Page() {
    try {
        // Recolha o domínio de forma semelhante
        const response = await fetch('/api/get-url');
        const data = await response.json();

        const domain = new URL(data.url).origin;

        const body = {
            domain: domain.replace('www.', ''),
        };

        const apiResponse = await fetch(`https://dev.fastsaleimoveis.com.br/api/user-pages/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });

        const apiData = await apiResponse.json();

        // Redireciona se necessário
        redirect('/home');

        return (
            <>
                <Head>
                    {apiData && (
                        <>
                            <title>{apiData.data.seo_title}</title>
                            <meta name="description" content={apiData.data.seo_description} />
                            <meta property="og:title" content={apiData.data.seo_title} />
                            <meta property="og:image" content={apiData.data.seo_image} />
                            <meta property="og:description" content={apiData.data.seo_description} />
                        </>
                    )}
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                {/* Outros componentes ou conteúdo aqui */}
            </>
        );
    } catch (error) {
        console.error('Erro ao fazer a requisição no servidor:', error);
        // Redirecione ou exiba uma mensagem de erro, conforme necessário
        return (
            <>
                <Head>
                    <title>Error</title>
                    <meta name="description" content="An error occurred" />
                </Head>
                <p>Ocorreu um erro ao carregar os dados.</p>
            </>
        );
    }
}