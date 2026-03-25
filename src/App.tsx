import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MessageSquare, 
  PenTool, 
  Video, 
  Rocket, 
  BarChart, 
  ChevronRight, 
  ChevronLeft, 
  Info, 
  Clock, 
  Layers,
  Sparkles,
  Cpu,
  Monitor,
  BookOpen,
  ExternalLink,
  ArrowRight
} from 'lucide-react';
import { 
  PROJECT_TYPES, 
  PROJECT_SIZES, 
  PROCESS_STEPS, 
  ProjectType, 
  ProjectSize 
} from './types';

const IconMap: Record<string, any> = {
  MessageSquare,
  PenTool,
  Video,
  Rocket,
  BarChart,
  'new_course': BookOpen,
  'bisynchronous': Layers,
  'flipped': Monitor,
  'ai': Cpu,
  'xr': Rocket,
  'module': Sparkles,
};

export default function App() {
  const [step, setStep] = useState(0);
  const [selectedType, setSelectedType] = useState<ProjectType | null>(null);
  const [selectedSize, setSelectedSize] = useState<ProjectSize | null>(null);
  const [activeProcessStep, setActiveProcessStep] = useState<string | null>(null);
  const [detailedStepId, setDetailedStepId] = useState<string | null>(null);

  const totalWeeks = useMemo(() => {
    if (!selectedSize) return 0;
    const size = PROJECT_SIZES.find(s => s.id === selectedSize);
    if (!size) return 0;
    return PROCESS_STEPS.reduce((acc, step) => acc + (step.baseWeeks * size.multiplier), 0);
  }, [selectedSize]);

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => s - 1);

  const detailedStep = useMemo(() => 
    PROCESS_STEPS.find(s => s.id === detailedStepId), 
    [detailedStepId]
  );

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="nd-gradient text-white py-6 px-8 shadow-md">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Office of Digital Learning</h1>
            <p className="text-sm opacity-80">University of Notre Dame</p>
          </div>
          <div className="hidden md:block">
            <span className="text-xs uppercase tracking-widest font-semibold opacity-60">Faculty Interactive Guide</span>
          </div>
        </div>
      </header>

      <main className="flex-grow max-w-6xl mx-auto w-full p-6 md:p-12">
        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div
              key="welcome"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="nd-card p-12 text-center space-y-8"
            >
              <div className="inline-block p-4 bg-nd-gold/10 rounded-full mb-4">
                <Sparkles className="w-12 h-12 text-nd-gold" />
              </div>
              <h2 className="text-4xl font-bold text-nd-navy">Partnering for Excellence</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                The Office of Digital Learning collaborates with Notre Dame faculty to design and build 
                engaging, high-quality digital learning experiences.
              </p>
              <div className="pt-8">
                <button 
                  onClick={nextStep}
                  className="nd-button-primary flex items-center gap-2 mx-auto"
                >
                  Explore Our Process <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          )}

          {step === 1 && (
            <motion.div
              key="type-selector"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <div className="text-center">
                <h2 className="text-3xl font-bold text-nd-navy">What are you envisioning?</h2>
                <p className="text-gray-600 mt-2">Select the type of project you're interested in.</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {PROJECT_TYPES.map((type) => {
                  const Icon = IconMap[type.id];
                  return (
                    <button
                      key={type.id}
                      onClick={() => {
                        setSelectedType(type.id);
                        nextStep();
                      }}
                      className={`nd-card p-8 text-left transition-all hover:border-nd-gold group ${
                        selectedType === type.id ? 'border-nd-gold ring-2 ring-nd-gold/20' : ''
                      }`}
                    >
                      <div className="p-3 bg-nd-gray rounded-lg w-fit mb-4 group-hover:bg-nd-gold/10 transition-colors">
                        <Icon className="w-8 h-8 text-nd-navy group-hover:text-nd-gold" />
                      </div>
                      <h3 className="text-xl font-bold mb-2">{type.label}</h3>
                      <p className="text-sm text-gray-500 leading-relaxed">{type.description}</p>
                    </button>
                  );
                })}
              </div>
              
              <div className="flex justify-start">
                <button onClick={prevStep} className="flex items-center gap-2 text-gray-500 hover:text-nd-navy">
                  <ChevronLeft className="w-5 h-5" /> Back
                </button>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="size-selector"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <div className="text-center">
                <h2 className="text-3xl font-bold text-nd-navy">How big is the scope?</h2>
                <p className="text-gray-600 mt-2">The size of the project determines the timeline and resources needed.</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {PROJECT_SIZES.map((size) => (
                  <button
                    key={size.id}
                    onClick={() => {
                      setSelectedSize(size.id);
                      nextStep();
                    }}
                    className={`nd-card p-8 text-center transition-all hover:border-nd-gold group ${
                      selectedSize === size.id ? 'border-nd-gold ring-2 ring-nd-gold/20' : ''
                    }`}
                  >
                    <div className="text-4xl font-black text-nd-navy/10 mb-4 group-hover:text-nd-gold/20 transition-colors">
                      {size.id}
                    </div>
                    <h3 className="text-xl font-bold mb-2">{size.label}</h3>
                    <p className="text-sm text-gray-500">{size.description}</p>
                  </button>
                ))}
              </div>
              
              <div className="flex justify-between">
                <button onClick={prevStep} className="flex items-center gap-2 text-gray-500 hover:text-nd-navy">
                  <ChevronLeft className="w-5 h-5" /> Back
                </button>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="process-viz"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="space-y-12"
            >
              <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-nd-gold font-bold uppercase tracking-widest text-xs">
                    <Layers className="w-4 h-4" /> 
                    {PROJECT_TYPES.find(t => t.id === selectedType)?.label} • Size {selectedSize}
                  </div>
                  <h2 className="text-4xl font-bold text-nd-navy">Your ODL Journey</h2>
                </div>
                <div className="bg-nd-navy text-white p-6 rounded-2xl flex items-center gap-6 shadow-xl">
                  <div className="flex items-center gap-3">
                    <Clock className="w-8 h-8 text-nd-gold" />
                    <div>
                      <p className="text-xs uppercase opacity-60 font-bold">Estimated Timeline</p>
                      <p className="text-2xl font-bold">{totalWeeks} Weeks</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative">
                {/* Connection Line */}
                <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 -translate-y-1/2 hidden md:block" />
                
                <div className="grid grid-cols-1 md:grid-cols-5 gap-8 relative">
                  {PROCESS_STEPS.map((procStep, idx) => {
                    const Icon = IconMap[procStep.icon];
                    const size = PROJECT_SIZES.find(s => s.id === selectedSize);
                    const stepWeeks = procStep.baseWeeks * (size?.multiplier || 1);
                    const isActive = activeProcessStep === procStep.id;

                    return (
                      <div key={procStep.id} className="relative">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => {
                            setDetailedStepId(procStep.id);
                            setStep(4);
                          }}
                          className={`w-full nd-card p-6 flex flex-col items-center text-center gap-4 transition-all z-10 relative ${
                            isActive ? 'border-nd-gold ring-4 ring-nd-gold/10' : ''
                          }`}
                        >
                          <div className={`p-4 rounded-full ${isActive ? 'bg-nd-gold text-white' : 'bg-nd-gray text-nd-navy'}`}>
                            <Icon className="w-6 h-6" />
                          </div>
                          <div>
                            <h4 className="font-bold text-sm mb-1">{procStep.title}</h4>
                            <p className="text-xs text-nd-gold font-bold">{stepWeeks} {stepWeeks === 1 ? 'Week' : 'Weeks'}</p>
                          </div>
                          <div className="text-[10px] uppercase tracking-wider font-bold text-gray-400 flex items-center gap-1">
                            Details <ChevronRight className="w-3 h-3" />
                          </div>
                        </motion.button>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Examples Section */}
              <div className="nd-card p-8 border-dashed border-2 border-gray-200 bg-gray-50/50">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-nd-navy flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-nd-gold" />
                      Project Examples
                    </h3>
                    <p className="text-sm text-gray-600">
                      See how other faculty have implemented {PROJECT_TYPES.find(t => t.id === selectedType)?.label} projects of this scale.
                    </p>
                  </div>
                  <button className="nd-button-secondary flex items-center gap-2 text-sm">
                    View Examples on NDL Website <ExternalLink className="w-4 h-4" />
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm flex items-center gap-4 group cursor-pointer hover:border-nd-gold transition-colors">
                      <div className="w-12 h-12 bg-nd-gray rounded flex items-center justify-center text-nd-navy font-bold group-hover:bg-nd-gold/10 group-hover:text-nd-gold">
                        {i}
                      </div>
                      <div className="text-sm font-medium">Example Project {i}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="nd-card p-8 bg-nd-gold/5 border-nd-gold/20">
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="flex-grow space-y-4">
                    <h3 className="text-2xl font-bold text-nd-navy">Ready to start your project?</h3>
                    <p className="text-gray-600">
                      This timeline is an estimate based on your selections. Every project is unique, 
                      and we're excited to discuss yours in detail.
                    </p>
                  </div>
                  <div className="flex gap-4">
                    <button 
                      onClick={() => setStep(2)}
                      className="nd-button-secondary"
                    >
                      Change Size
                    </button>
                    <button className="nd-button-primary">
                      Contact ODL
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {step === 4 && detailedStep && (
            <motion.div
              key="step-detail"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              <button 
                onClick={() => setStep(3)}
                className="flex items-center gap-2 text-nd-navy font-bold hover:text-nd-gold transition-colors"
              >
                <ChevronLeft className="w-5 h-5" /> Back to Journey
              </button>

              <div className="nd-card overflow-hidden">
                <div className="nd-gradient p-12 text-white">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-4 bg-white/10 rounded-full">
                      {(() => {
                        const Icon = IconMap[detailedStep.icon];
                        return <Icon className="w-10 h-10" />;
                      })()}
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold">{detailedStep.title}</h2>
                      <p className="opacity-80">Phase {PROCESS_STEPS.indexOf(detailedStep) + 1} of 5</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-12 space-y-12">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    <div className="md:col-span-2 space-y-6">
                      <h3 className="text-2xl font-bold text-nd-navy">What to Expect</h3>
                      <p className="text-lg text-gray-600 leading-relaxed">
                        {detailedStep.detailedContent}
                      </p>
                      
                      <div className="pt-8 space-y-4">
                        <h4 className="font-bold text-nd-navy uppercase tracking-wider text-sm">Key Deliverables</h4>
                        <ul className="space-y-3">
                          {['Project Charter', 'Resource Roadmap', 'Initial Storyboards'].map((item, i) => (
                            <li key={i} className="flex items-center gap-3 text-gray-600">
                              <div className="w-2 h-2 bg-nd-gold rounded-full" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    
                    <div className="space-y-6">
                      <div className="bg-nd-gray p-8 rounded-2xl space-y-4">
                        <h4 className="font-bold text-nd-navy">Time Commitment</h4>
                        <div className="flex items-center gap-3">
                          <Clock className="w-6 h-6 text-nd-gold" />
                          <span className="text-2xl font-bold">
                            {detailedStep.baseWeeks * (PROJECT_SIZES.find(s => s.id === selectedSize)?.multiplier || 1)} Weeks
                          </span>
                        </div>
                        <p className="text-xs text-gray-500">
                          Based on a Size {selectedSize} project scope.
                        </p>
                      </div>

                      <div className="bg-nd-gold/10 p-8 rounded-2xl space-y-4">
                        <h4 className="font-bold text-nd-navy">Faculty Role</h4>
                        <p className="text-sm text-gray-600 italic">
                          "Your expertise is the core. We provide the technical and pedagogical scaffolding."
                        </p>
                        <button className="text-nd-navy font-bold text-sm flex items-center gap-2 hover:gap-3 transition-all">
                          Learn More <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="bg-nd-navy text-white/40 py-8 px-8 text-center text-xs">
        <div className="max-w-6xl mx-auto space-y-2">
          <p>© {new Date().getFullYear()} University of Notre Dame • Office of Digital Learning</p>
          <p>Designed for Faculty Excellence</p>
        </div>
      </footer>
    </div>
  );
}
