export const isProd = process.env.NODE_ENV === 'production';

export const siteUrl = isProd
  ? 'https://shyamnalluri.github.io/devops-engineer-portfolio'
  : 'http://localhost:3000';

export const ogImageUrl = isProd
  ? `${siteUrl}/images/profile.jpg`
  : '/images/profile.jpg';

export const gtagId = process.env.NEXT_PUBLIC_GTAG_ID;

export const siteMeta = {
  title: 'Shyam Nalluri | DevOps Engineer',
  description:
    'DevOps Engineer specializing in cloud infrastructure, automation, and scalable solutions. Expertise in AWS, Kubernetes, and CI/CD pipelines.',
  keywords: [
    'DevOps',
    'Cloud Architecture',
    'AWS',
    'Kubernetes',
    'CI/CD',
    'Infrastructure as Code',
    'Automation',
  ],
  twitterCreator: '@shyamnalluri',
};


