import frunt1 from '../assets/projects/Frunt/Frunt-1-(Landing).webp'
import frunt2 from '../assets/projects/Frunt/Frunt-2-(Home).webp'
import frunt3 from '../assets/projects/Frunt/Frunt-3-(Ask-Frunt).webp'
import frunt4 from '../assets/projects/Frunt/Frunt-4-(Team).webp'
import frunt5 from '../assets/projects/Frunt/Frunt-5-(Rota).webp'
import frunt6 from '../assets/projects/Frunt/Frunt-6-(Documents).webp'
import frunt7 from '../assets/projects/Frunt/Frunt-7-(Training).webp'
import fruntM1 from '../assets/projects/Frunt/mobile/Frunt-Mobile-1-(Home).webp'
import fruntM2 from '../assets/projects/Frunt/mobile/Frunt-Mobile-2-(Ask).webp'
import fruntM3 from '../assets/projects/Frunt/mobile/Frunt-Mobile-3-(Schedule).webp'
import fruntM4 from '../assets/projects/Frunt/mobile/Frunt-Mobile-4-(Library).webp'
import fruntM5 from '../assets/projects/Frunt/mobile/Frunt-Mobile-5-(Training).webp'
import fruntM6 from '../assets/projects/Frunt/mobile/Frunt-Mobile-6-(Updates).webp'
import ledger1 from '../assets/projects/Ledger/Ledger-1-(Overview).webp'
import ledger2 from '../assets/projects/Ledger/Ledger-2-(Ledger-bot).webp'
import ledger3 from '../assets/projects/Ledger/Ledger-3-(Expenses).webp'
import ledger4 from '../assets/projects/Ledger/Ledger-4-(Income).webp'
import ledger5 from '../assets/projects/Ledger/Ledger-5-(Budgets).webp'
import ledger6 from '../assets/projects/Ledger/Ledger-6-(Reports).webp'
import ledger7 from '../assets/projects/Ledger/Ledger-7-(Settings).webp'
import msaScreenshot from '../assets/projects/MSA/MSA-screenshot.webp'
import msaLong from '../assets/projects/MSA/MSA-long-screenshot.webp'
import msaMobileLong from '../assets/projects/MSA/Mobile-MSA-long-screenshot.webp'
import redCrossScreenshot from '../assets/projects/RedCross/RedCrossReigate-screenshot.webp'
import redCrossLong from '../assets/projects/RedCross/RedCrossReigate-long-screenshot.webp'
import redCrossMobileLong from '../assets/projects/RedCross/Mobile-RedCrossReigate-long-screenshot.webp'
import footyScores1 from '../assets/projects/FootyScores/FootyScores-mobile-screenshot-1.webp'
import footyScores2 from '../assets/projects/FootyScores/FootyScores-mobile-screenshot-2.webp'
import liftioHome from '../assets/projects/Liftio/Liftio-1-(Home).webp'
import liftioTracking from '../assets/projects/Liftio/Liftio-2-(Tracking).webp'
import liftioOverview from '../assets/projects/Liftio/Liftio-3-(Overview).webp'
import liftioCharts from '../assets/projects/Liftio/Liftio-4-(Charts).webp'
import liftioExercise from '../assets/projects/Liftio/Liftio-5-(Exercise-Detail).webp'
import liftioHero from '../assets/projects/Liftio/Liftio-6-(Hero).webp'
import youtubeHome from '../assets/projects/Youtube-Clone/Youtube-Clone-1-(Home).webp'
import youtubeWatch from '../assets/projects/Youtube-Clone/Youtube-Clone-2-(Watch).webp'
import netflixLong from '../assets/projects/Netflix-Clone/Netflix-Clone-Long-Screenshot.webp'
import netflixMobileLong from '../assets/projects/Netflix-Clone/Netflix-Clone-Long-Screenshot_Mobile.webp'

const projects = [
  {
    id: 8,
    category: 'Web App',
    featured: true,
    title: 'Frunt',
    description:
      "Live, multi-tenant SaaS that turns a restaurant's own compliance documents into staff training, onboarding, and instant sourced answers. Managers upload their SOPs and policies; frunt extracts and classifies each one, auto-builds the statutory courses, runs the rota with natural-language editing, and powers an 'Ask frunt' assistant that answers grounded strictly in that restaurant's own documents — every answer cited. Built across two separate repositories: a Next.js web app (the manager dashboard + the API, with the ingestion pipeline, RAG retrieval over pgvector, background jobs and Stripe billing) and a Flutter staff app — a pure client to that API, shipped to the App Store and Google Play — that staff use to read docs, attest, take training and get the same sourced answers.",
    github: null,
    liveUrl: 'https://frunthospitality.com',
    carouselImages: [frunt1, frunt2, frunt3, frunt4, frunt5, frunt6, frunt7],
    mobileShowcaseImages: [fruntM1, fruntM2, fruntM3, fruntM4, fruntM5, fruntM6],
    tech: ['Next.js 15', 'TypeScript', 'Supabase', 'pgvector', 'Claude AI', 'OpenAI Embeddings', 'Inngest', 'Stripe', 'Tailwind CSS', 'Flutter', 'Dart', 'Riverpod', 'Firebase', 'Vercel'],
  },
  {
    id: 1,
    category: 'Mobile App',
    featured: true,
    title: 'Liftio',
    description:
      'iOS gym tracking app built for fast, focused logging. Track 330+ exercises with auto-filled weights, set type tagging, PB detection, and a plate calculator. Visualise progress through charts, 1RM tracking, and a GitHub-style activity heatmap. Includes Apple Sign-In, cloud backup via Supabase, and subscription billing via RevenueCat.',
    github: null,
    liveUrl: null,
    appStoreUrl: 'https://apps.apple.com/gb/app/liftio/id6759969740',
    mobileShowcaseImages: [liftioHome, liftioTracking, liftioOverview, liftioCharts, liftioExercise, liftioHero],
    tech: ['React Native', 'Expo SDK 54', 'TypeScript', 'Expo Router', 'Zustand', 'SQLite', 'Supabase', 'RevenueCat', 'Reanimated'],
  },
  {
    id: 5,
    category: 'Web App',
    featured: true,
    title: 'Ledger',
    description:
      'Personal finance dashboard with AI-powered transaction entry via Claude, OAuth sign-in, live currency conversion, and chart-based budget tracking.',
    github: 'https://github.com/MattKay02/Ledger',
    liveUrl: 'https://ledger-finance.vercel.app',
    carouselImages: [ledger1, ledger2, ledger3, ledger4, ledger5, ledger6, ledger7],
    tech: ['React', 'Vite', 'Supabase', 'Tailwind CSS', 'Recharts', 'Claude AI', 'Vercel'],
  },
  {
    id: 7,
    category: 'Web App',
    title: 'YouTube Clone',
    description:
      'Full-stack video-sharing platform replicating the core YouTube experience. Upload videos, browse a thumbnail feed with infinite scroll, watch on a dedicated player page, like and comment, subscribe to channels, and manage your content — all with JWT authentication and a futuristic dark UI.',
    github: 'https://github.com/MattKay02/Youtube_Clone',
    liveUrl: null,
    carouselImages: [youtubeHome, youtubeWatch],
    tech: ['Next.js 16', 'React 19', 'TypeScript', 'Tailwind CSS', 'Prisma', 'SQLite', 'shadcn/ui', 'JWT'],
  },
  {
    id: 2,
    category: 'Landing Page',
    featured: true,
    title: 'MSA',
    description:
      'Static multi-page portfolio for Matthew Simpson, an architecture student at UNLV. Showcases projects with rich imagery, design narratives, and contact info — built with pure vanilla web technologies.',
    github: 'https://github.com/MattKay02/MSA',
    liveUrl: 'https://matthewsimpsonarchitecture.vercel.app',
    image: msaScreenshot,
    longImage: msaLong,
    mobileLongImage: msaMobileLong,
    tech: ['HTML5', 'CSS3', 'JavaScript', 'Google Fonts'],
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
    id: 6,
    category: 'Web App',
    title: 'Netflix Clone',
    description:
      'Frontend Netflix clone built to practice deliberate state architecture — useState for local, React Context for scoped UI, Zustand for persistence, and TanStack Query for all TMDB API data. Every layer has a documented reason.',
    github: 'https://github.com/MattKay02/Netflix_Clone',
    longImage: netflixLong,
    mobileLongImage: netflixMobileLong,
    tech: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'React Router', 'TanStack Query', 'Zustand', 'Axios', 'TMDB API'],
  },
  {
    id: 4,
    category: 'Landing Page',
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
