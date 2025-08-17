import { siteUrl } from '@/config/site';

export default function Head() {
  // Preload likely LCP hero/profile image for faster rendering
  const base = siteUrl.replace(/\/$/, '');
  const heroImage = `${base}/images/profile.jpg`;
  return (
    <>
      <link rel="preload" as="image" href={heroImage} imageSrcSet={`${heroImage} 1x`} />
    </>
  );
}
