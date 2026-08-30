import { Helmet } from "react-helmet-async";

// NOTE: every tag below must be a DIRECT child of <Helmet> — react-helmet-async
// does not look inside a nested <>...</> Fragment to find tags, so an earlier
// version of this component that grouped the canonical/og: tags in a fragment
// silently dropped the og:title/og:description/og:url tags from every page
// (confirmed by inspecting the actual rendered DOM). Conditional `{x && <tag/>}`
// expressions are fine since they resolve to a direct child or `false`, not a
// wrapping element — just never reintroduce a <>...</> or <div> around these.
export default function SEO({ title, description, path = "/", noindex = false }) {
  const url = `https://www.babyblossomfertility.in${path}`;
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      {noindex && (
        // No canonical here on purpose: a 404/error page has no "real" URL
        // to canonicalize to, and pointing it at the homepage (an earlier
        // bug) told Google every broken link WAS the homepage.
        <meta name="robots" content="noindex, follow" />
      )}
      {!noindex && <link rel="canonical" href={url} />}
      {!noindex && <meta property="og:title" content={title} />}
      {!noindex && <meta property="og:description" content={description} />}
      {!noindex && <meta property="og:url" content={url} />}
    </Helmet>
  );
}
