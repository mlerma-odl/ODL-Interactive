export type ProjectType = 'flipped' | 'ai' | 'new_course' | 'xr' | 'module' | 'bisynchronous';
export type ProjectSize = 'S' | 'M' | 'L' | 'XL';

export interface ProcessStep {
  id: string;
  title: string;
  description: string;
  icon: string;
  baseWeeks: number; // Base time for 'S' size
  detailedContent: string;
}

export interface ProjectConfig {
  type: ProjectType;
  size: ProjectSize;
}

export const PROJECT_TYPES: { id: ProjectType; label: string; description: string }[] = [
  { id: 'new_course', label: 'New Course Creation', description: 'Developing a full online or hybrid course from scratch.' },
  { id: 'bisynchronous', label: 'Bisynchronous Course', description: 'A blend of synchronous and asynchronous learning experiences.' },
  { id: 'flipped', label: 'Flipped Classroom', description: 'Redesigning a course to move content delivery online and active learning to the classroom.' },
  { id: 'ai', label: 'AI Integration', description: 'Incorporating AI tools and literacy into your curriculum.' },
  { id: 'xr', label: 'XR Experiences', description: 'Creating immersive VR, AR, or 360-degree video content.' },
  { id: 'module', label: 'Single Module', description: 'Developing a specific digital learning unit or resource.' },
];

export const PROJECT_SIZES: { id: ProjectSize; label: string; description: string; multiplier: number }[] = [
  { id: 'S', label: 'Small', description: 'A single module or resource.', multiplier: 1 },
  { id: 'M', label: 'Medium', description: 'A significant portion of a course.', multiplier: 2 },
  { id: 'L', label: 'Large', description: 'A full course or complex experience.', multiplier: 4 },
  { id: 'XL', label: 'Extra Large', description: 'A multi-course sequence or institutional initiative.', multiplier: 8 },
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    id: 'intake',
    title: 'Intake & Consultation',
    description: 'Initial meeting to define goals, scope, and project alignment.',
    icon: 'MessageSquare',
    baseWeeks: 1,
    detailedContent: 'During the Intake phase, we meet with you to understand your pedagogical goals. We discuss the student experience, technical requirements, and how ODL can best support your vision. This is where we define the "Why" and "What" of your project.',
  },
  {
    id: 'design',
    title: 'Design & Planning',
    description: 'Learning design, storyboarding, and technical architecture.',
    icon: 'PenTool',
    baseWeeks: 2,
    detailedContent: 'In the Design phase, our learning designers work with you to create a blueprint for your course or module. This includes mapping out learning objectives, drafting storyboards for videos, and planning interactive elements.',
  },
  {
    id: 'development',
    title: 'Development & Production',
    description: 'Content creation, video production, and platform building.',
    icon: 'Video',
    baseWeeks: 4,
    detailedContent: 'This is where the magic happens. Our production team films and edits videos, builds interactive components, and assembles the digital environment. You will review drafts and provide feedback throughout this iterative process.',
  },
  {
    id: 'implementation',
    title: 'Implementation & Launch',
    description: 'Quality assurance, pilot testing, and final deployment.',
    icon: 'Rocket',
    baseWeeks: 1,
    detailedContent: 'We perform rigorous testing to ensure everything works perfectly across different devices and browsers. We then help you launch the content to your students, providing support during the initial rollout.',
  },
  {
    id: 'evaluation',
    title: 'Evaluation & Iteration',
    description: 'Reviewing student feedback and refining the experience.',
    icon: 'BarChart',
    baseWeeks: 1,
    detailedContent: 'After the launch, we gather data and feedback from students and faculty. We analyze what worked well and identify areas for improvement, ensuring your digital learning experience continues to evolve and excel.',
  },
];
