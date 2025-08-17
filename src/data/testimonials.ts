// Testimonials Data
// Update this file to modify testimonials in the contact section

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  content: string;
  image: string;
  highlight: string;
}

export const testimonialsData: Testimonial[] = [
  {
    id: 1,
    name: 'Anthony McKale',
    role: 'Principal DevOps Consultant',
    company: 'Riversafe ltd',
    content:
      "The literal embodiment of exceeds expectations in every way, great team player, great devops engineer, even a great cook. It's great to have Shyam on your project, because you know your in good hands.",
    image: '../images/testimonials/Anthony_McKale.jpg',
    highlight: 'Dependability & Collaboration',
  },
  {
    id: 2,
    name: 'Dominic Thomas',
    role: 'Tech Lead',
    company: 'BP p.l.c.',
    content:
      'Shyam has solved some difficult technical challenges, such as automating self-service Splunk alert creation via a simple form and Python, including a pre load test check. He picks up new technologies easily and is a pleasure to work with.',
    image: '../images/testimonials/Dominic_Thomas.jpg',
    highlight: 'Problem Solver, Quick Learner',
  },
  {
    id: 3,
    name: 'Patrick Morris',
    role: 'Principal DevOps Consultant',
    company: 'Riversafe ltd',
    content:
      'Shyam made a significant impact at BP by delivering technical solutions that generated cost savings, automated key workflows, and enhanced Azure DevOps operations. His calm, reliable approach to complex challenges and his contributions to our DevOps Maturity Dashboard demonstrate his strategic problem-solving and dedication to continuous improvement.',
    image: '../images/testimonials/Patrick_Morris.jpg',
    highlight: 'Strategic problem solver and cost saving expert',
  },
  {
    id: 4,
    name: 'Sairam Sadnala',
    role: 'Site Reliability Engineer',
    company: 'BP p.l.c.',
    content:
      'Shyam’s mastery of Ansible, Azure DevOps, SonarQube, Splunk, and Grafana enabled him to optimize processes, enhance system reliability, and deliver robust automation solutions. His proactive problem-solving and commitment to continuous improvement make him an invaluable team asset.',
    image: '../../images/testimonials/Sairam_Sadnala.jpg',
    highlight: 'Automation & Reliability Champion',
  },
  {
    id: 5,
    name: 'Vitali Pozniak',
    role: 'Principal DevSecops Lead',
    company: 'Riversafe ltd',
    content:
      'Shyam’s technical acumen across AWS, Azure, CI/CD and containerisation using Docker and Kubernetes is exceptional. At RiverSafe Limited he delivered efficient, scalable DevOps solutions with a practical, best-practice-oriented approach. Dependable and skilled, he is an asset to any engineering team.',
    image: '../../images/testimonials/Vitali_Pozniak.jpg',
    highlight: 'AWS, Azure, CI/CD and Containerisation Specialist',
  },
  {
    id: 6,
    name: 'Melissa Gonzales',
    role: 'Software Engineer',
    company: 'Riversafe ltd',
    content:
      'Shyam joined as an eager Associate, asking the right questions and rapidly growing into a confident, skilled DevOps professional. He consistently delivers high-quality work, is a supportive team player and someone you can always count on to get the job done.',
    image: '../images/testimonials/Melissa_Gonzales.jpg',
    highlight: 'Collaborative, Fast Learner and Dependable Performer',
  },
];
