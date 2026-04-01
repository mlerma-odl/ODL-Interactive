export type ProjectType = 'flipped' | 'ai' | 'new_course' | 'xr' | 'module' | 'bisynchronous';
export type ProjectSize = 'S' | 'M' | 'L' | 'XL';

export interface ProcessTaskGroup {
  heading?: string;
  items: string[];
}

export interface ProcessStep {
  id: string;
  title: string;
  description: string;
  icon: string;
  baseWeeks: number; // Base time for 'S' size
  baseFacultyHours: number; // Base faculty hours for 'S' size
  detailedContent: string;
  taskGroups: ProcessTaskGroup[];
  artifacts: string[];
  facultyRole: string;
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
    title: 'Intake/Discovery',
    description: 'The initial step to define the scope and feasibility of your project.',
    icon: 'MessageSquare',
    baseWeeks: 1,
    baseFacultyHours: 2,
    detailedContent: 'The Intake/Discovery phase is where your journey begins. We review your initial ideas, evaluate the scope, and ensure alignment with pedagogical goals. This phase includes submitting the intake form, an initial review by the ODL team, and a discovery meeting to dive deeper into your vision.',
    taskGroups: [
      {
        items: ['Submit intake form', 'Initial review by ODL team', 'Discovery meeting']
      }
    ],
    artifacts: ['Intake Form'],
    facultyRole: 'In this initial phase, you are expected to share your high-level vision and pedagogical goals. Your primary role is to provide context on your students\' needs and the desired learning outcomes so we can assess project feasibility.'
  },
  {
    id: 'consultation',
    title: 'Initial Consultation & Kickoff',
    description: 'Aligning on goals, timelines, and the ODL process.',
    icon: 'UserCheck',
    baseWeeks: 2,
    baseFacultyHours: 4,
    detailedContent: 'In this phase, we move from discovery to concrete planning. During the Consultation, we evaluate your intake form, understand your specific timeline, and align on high-level objectives. The Kickoff meeting then serves to explain the ODL process in detail and ensure everyone is aligned on the project milestones.',
    taskGroups: [
      {
        heading: 'Consultation',
        items: [
          'Evaluate intake form',
          'Understand timeline',
          'Understand high-level objectives'
        ]
      },
      {
        heading: 'Kickoff',
        items: [
          'Explain ODL process',
          'Align on timelines'
        ]
      }
    ],
    artifacts: ['ODL Process / Kickoff deck', 'Project Charter'],
    facultyRole: 'During this phase, you are expected to brainstorm and start forming your course details. The expectation is also to understand the ODL process and agree to the amount of effort it will take to ensure a successful collaboration.'
  },
  {
    id: 'design',
    title: 'Design & Pre-Production',
    description: 'Mapping out the learning experience and preparing for media creation.',
    icon: 'PenTool',
    baseWeeks: 3,
    baseFacultyHours: 8,
    detailedContent: 'The Design phase focuses on establishing course and learning objectives, deciding on content, and finalizing the course map. Pre-Production then kicks in with scripting, providing directions for filming (including dress code and style), and securing filming locations and necessary permissions.',
    taskGroups: [
      {
        heading: 'Design',
        items: [
          'Establish course objectives',
          'Establish learning objectives',
          'Decide on course content',
          'Create and finalize course map'
        ]
      },
      {
        heading: 'Pre-Production',
        items: [
          'Scripting',
          'Directions for Filming (dress code, etc.)',
          'Securing filming locations and permissioning'
        ]
      }
    ],
    artifacts: ['Course Map', 'Media Consent Form'],
    facultyRole: 'Your role is critical here as the Subject Matter Expert. You will lead the creation of learning objectives and content mapping. In pre-production, you will be responsible for drafting scripts and preparing for the visual elements of your course.'
  },
  {
    id: 'production',
    title: 'Production',
    description: 'Capturing high-quality video and media assets.',
    icon: 'Video',
    baseWeeks: 4,
    baseFacultyHours: 10,
    detailedContent: 'This is where we capture the core media for your course. Whether it is studio filming, on-location shoots, or collecting B-roll, our production team ensures high-quality assets that align with your instructional goals.',
    taskGroups: [
      {
        items: ['Studio filming', 'On-location shoots', 'B-roll collection']
      }
    ],
    artifacts: ['Raw Footage'],
    facultyRole: 'You are the "talent" and the expert on camera. Your role involves attending filming sessions, delivering your content clearly, and ensuring the technical accuracy of the material being recorded.'
  },
  {
    id: 'post-production',
    title: 'Post-Production & Course Building',
    description: 'Editing media and assembling the course in the LMS.',
    icon: 'Layers',
    baseWeeks: 4,
    baseFacultyHours: 6,
    detailedContent: 'Post-Production involves editing the raw footage, creating graphics, and building out the course structure within Canvas or your chosen LMS. This phase transforms raw assets into a cohesive learning experience.',
    taskGroups: [
      {
        items: ['Video editing', 'Graphic design', 'Canvas/LMS page building']
      }
    ],
    artifacts: ['Draft Videos', 'Course Shell'],
    facultyRole: 'In this phase, you will review draft videos and course pages for accuracy and pedagogical alignment. You will also work on building out supplementary materials like quizzes and assignments within the LMS.'
  },
  {
    id: 'qa',
    title: 'QA & Launch',
    description: 'Final review and making the course live for students.',
    icon: 'Rocket',
    baseWeeks: 1,
    baseFacultyHours: 3,
    detailedContent: 'Before going live, we perform rigorous quality assurance, including accessibility checks and content proofing. Once everything is approved, we launch the course, making it available to your students.',
    taskGroups: [
      {
        items: ['Accessibility check', 'Content proofing', 'Final approval']
      }
    ],
    artifacts: ['Live Course'],
    facultyRole: 'Your final review is essential. You will perform a complete walkthrough of the course to ensure everything is perfect before launch. Once satisfied, you provide the final approval to go live.'
  },
  {
    id: 'evaluation',
    title: 'Evaluation & Iteration',
    description: 'Reviewing performance and planning future improvements.',
    icon: 'BarChart',
    baseWeeks: 1,
    baseFacultyHours: 2,
    detailedContent: 'After the course has been live, we gather feedback and analyze performance data. This phase is crucial for understanding the student experience and identifying areas for refinement in future iterations.',
    taskGroups: [
      {
        items: ['Student feedback review', 'Data analysis', 'Iteration planning']
      }
    ],
    artifacts: ['Evaluation Report'],
    facultyRole: 'You will review student feedback and performance metrics with us. Your role is to reflect on the course delivery and collaborate on a plan for future enhancements based on real-world data.'
  },
];
