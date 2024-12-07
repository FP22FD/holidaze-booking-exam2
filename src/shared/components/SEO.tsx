import { Helmet } from 'react-helmet-async';

interface Props {
  title: string;
  description: string;
}

export function SEO({ title, description }: React.PropsWithChildren<Props>) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
    </Helmet>
  );
}
