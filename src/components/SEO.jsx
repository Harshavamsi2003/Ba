import { Helmet } from "react-helmet-async";

export default function SEO({ title, description, path = "/" }) {
  const url = `https://www.babyblossomfertility.in${path}`;
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
    </Helmet>
  );
}