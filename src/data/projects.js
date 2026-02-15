import msaScreenshot from '../assets/projects/MSA-screenshot.png'
import redCrossScreenshot from '../assets/projects/RedCrossReigate-screenshot.png'

const projects = [
  {
    id: 1,
    category: 'Mobile App',
    title: 'Liftio',
    description:
      'Fitness tracking application for iOS and Android with workout logging, progress analytics, and social features.',
    github: 'https://github.com/MattKay02/Liftio',
    liveUrl: null,
    image: null,
    tech: ['React Native', 'Node.js', 'MongoDB'],
    status: 'In Development',
  },
  {
    id: 2,
    category: 'Web',
    title: 'MSA',
    description:
      'Portfolio website for architect Matthew Simpson showcasing architectural projects and practice.',
    github: 'https://github.com/MattKay02/MSA',
    liveUrl: 'https://matthewsimpsonarchitecture.vercel.app',
    image: msaScreenshot,
    tech: ['React', 'Vite', 'CSS Modules'],
  },
  {
    id: 3,
    category: 'Web',
    title: 'Red Cross',
    description:
      'Landing page for a traditional local pub in Reigate, Surrey. Featuring drinks menus, events, and essential pub information.',
    github: 'https://github.com/MattKay02/RedCrossReigate',
    liveUrl: 'https://red-cross-reigate.vercel.app',
    image: redCrossScreenshot,
    tech: ['React', 'Vite', 'CSS Modules'],
  },
]

export default projects
