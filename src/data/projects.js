import msaScreenshot from '../assets/projects/MSA/MSA-screenshot.png'
import redCrossScreenshot from '../assets/projects/RedCross/RedCrossReigate-screenshot.png'
import redCrossLong from '../assets/projects/RedCross/RedCrossReigate-long-screenshot.png'
import redCrossMobileLong from '../assets/projects/RedCross/Mobile-RedCrossReigate-long-screenshot.png'
import footyScores1 from '../assets/projects/FootyScores/FootyScores-mobile-screenshot-1.png'
import footyScores2 from '../assets/projects/FootyScores/FootyScores-mobile-screenshot-2.png'

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
    category: 'Mobile App',
    title: 'FootyScores',
    description:
      'Full-stack mobile app pulling live football data from API-Football. Built to explore end-to-end development with a React Native/Expo frontend and a Node.js/Express backend hosted on Render.',
    github: 'https://github.com/MattKay02/FootyScores',
    liveUrl: null,
    dualMobileImages: [footyScores1, footyScores2],
    tech: ['React Native', 'Expo SDK', 'Node.js', 'Express', 'API-Football', 'Render'],
    status: 'In Development',
  },
  {
    id: 4,
    category: 'Web',
    title: 'Red Cross',
    description:
      'Landing page for a traditional local pub in Reigate, Surrey. Featuring drinks menus, events, and essential pub information.',
    github: 'https://github.com/MattKay02/RedCrossReigate',
    liveUrl: 'https://red-cross-reigate.vercel.app',
    image: redCrossScreenshot,
    longImage: redCrossLong,
    mobileLongImage: redCrossMobileLong,
    tech: ['React', 'Vite', 'CSS Modules'],
  },
]

export default projects
