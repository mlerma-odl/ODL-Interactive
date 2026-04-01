import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GoogleGenAI, Type } from "@google/genai";
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
  ArrowRight,
  BrainCircuit,
  Loader2,
  UserCheck,
  UserCircle,
  Smile
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
  UserCheck,
  Layers,
  'new_course': BookOpen,
  'bisynchronous': Layers,
  'flipped': Monitor,
  'ai': Cpu,
  'xr': Rocket,
  'module': Sparkles,
};

const SaloneeIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <div className={`relative ${className}`}>
    <div className="absolute inset-0 bg-nd-gold/20 rounded-full animate-pulse" />
    <div className={`relative z-10 rounded-full overflow-hidden border-2 border-nd-gold/30 ${className}`}>
      <img 
        src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200&h=200" 
        alt="Salonee"
        className="w-full h-full object-cover"
        referrerPolicy="no-referrer"
      />
    </div>
    <div className="absolute -top-1 -right-1 z-20">
      <Sparkles className="w-3 h-3 text-nd-gold animate-bounce" />
    </div>
  </div>
);

export default function App() {
  const [step, setStep] = useState(0);
  const [selectedType, setSelectedType] = useState<ProjectType | null>(null);
  const [selectedSize, setSelectedSize] = useState<ProjectSize | null>(null);
  const [activeProcessStep, setActiveProcessStep] = useState<string | null>(null);
  const [detailedStepId, setDetailedStepId] = useState<string | null>(null);

  // AI State
  const [projectDescription, setProjectDescription] = useState('');
  const [subjectArea, setSubjectArea] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState<{
    type: ProjectType;
    size: ProjectSize;
    examples: string[];
    reasoning: string;
  } | null>(null);

  const totalWeeks = useMemo(() => {
    if (!selectedSize) return 0;
    const size = PROJECT_SIZES.find(s => s.id === selectedSize);
    if (!size) return 0;
    return PROCESS_STEPS.reduce((acc, step) => acc + (step.baseWeeks * size.multiplier), 0);
  }, [selectedSize]);

  const facultyEffort = useMemo(() => {
    if (!selectedSize) return { min: 0, max: 0 };
    const sizeMap: Record<ProjectSize, { min: number; max: number }> = {
      'S': { min: 10, max: 20 },
      'M': { min: 40, max: 60 },
      'L': { min: 100, max: 150 },
      'XL': { min: 300, max: 500 }
    };
    return sizeMap[selectedSize];
  }, [selectedSize]);

  const analyzeProject = async () => {
    if (!projectDescription || !subjectArea) return;
    setIsAnalyzing(true);
    
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });
      const model = "gemini-3-flash-preview";
      
      const prompt = `
        You are an expert learning designer at the University of Notre Dame's Office of Digital Learning. 
        Analyze the following project description and subject area from a faculty member.
        
        Subject Area: ${subjectArea}
        Project Description: ${projectDescription}

        Based on this, suggest the most appropriate Project Type and Project Size from these lists:
        Project Types: ${JSON.stringify(PROJECT_TYPES)}
        Project Sizes: ${JSON.stringify(PROJECT_SIZES)}

        Also, provide 3 specific, creative examples of what this project could look like for their discipline (${subjectArea}).
        Finally, provide a brief 1-2 sentence reasoning for your selection.

        Return the result in JSON format ONLY.
      `;

      const response = await ai.models.generateContent({
        model,
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              type: { type: Type.STRING },
              size: { type: Type.STRING },
              examples: { type: Type.ARRAY, items: { type: Type.STRING } },
              reasoning: { type: Type.STRING }
            },
            required: ["type", "size", "examples", "reasoning"]
          }
        }
      });

      const result = JSON.parse(response.text);
      setAiSuggestions(result);
      setStep(0.5); // Show AI results
    } catch (error) {
      console.error("AI Analysis failed:", error);
      // Fallback or error state could go here
    } finally {
      setIsAnalyzing(false);
    }
  };

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
              className="nd-card p-16 text-center space-y-10 max-w-4xl mx-auto"
            >
              <div className="space-y-4">
                <div className="inline-block p-4 bg-nd-gold/10 rounded-full mb-4">
                  <Sparkles className="w-12 h-12 text-nd-gold" />
                </div>
                <h2 className="text-5xl font-bold text-nd-navy tracking-tight">Partnering for Excellence</h2>
                <p className="text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
                  The Office of Digital Learning collaborates with Notre Dame faculty to design and build 
                  engaging, high-quality digital learning experiences.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-8">
                <button 
                  onClick={() => setStep(1)}
                  className="nd-card p-8 border-2 border-gray-100 hover:border-nd-navy transition-all group text-left flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="p-3 bg-nd-gray rounded-lg w-fit group-hover:bg-nd-navy group-hover:text-white transition-colors">
                      <Layers className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-nd-navy">Explore Manually</h3>
                    <p className="text-sm text-gray-500">Browse our project types and sizes at your own pace.</p>
                  </div>
                  <div className="mt-6 flex items-center gap-2 text-nd-navy font-bold text-sm">
                    Get Started <ChevronRight className="w-4 h-4" />
                  </div>
                </button>

                <button 
                  onClick={() => setStep(0.2)}
                  className="nd-card p-8 border-2 border-nd-gold/20 bg-nd-gold/5 hover:border-nd-gold transition-all group text-left flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="p-3 bg-nd-gold rounded-lg w-fit text-nd-navy">
                      <BrainCircuit className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-nd-navy">Explore with Salonee</h3>
                    <p className="text-sm text-gray-500">Our ODL Project Assistant will help scope your vision using AI.</p>
                  </div>
                  <div className="mt-6 flex items-center gap-2 text-nd-gold font-bold text-sm">
                    Meet Salonee <ChevronRight className="w-4 h-4" />
                  </div>
                </button>
              </div>
            </motion.div>
          )}

          {step === 0.2 && (
            <motion.div
              key="ai-input"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="max-w-3xl mx-auto space-y-8"
            >
              <button 
                onClick={() => setStep(0)}
                className="flex items-center gap-2 text-gray-500 hover:text-nd-navy font-medium"
              >
                <ChevronLeft className="w-5 h-5" /> Back
              </button>

              <div className="nd-card overflow-hidden shadow-2xl">
                <div className="bg-nd-navy p-10 text-white space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-nd-gold rounded-2xl text-nd-navy">
                      <BrainCircuit className="w-8 h-8" />
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold">Meet Salonee</h2>
                      <p className="text-nd-gold font-medium">Your ODL Project Assistant</p>
                    </div>
                  </div>
                  <p className="text-white/70 leading-relaxed">
                    I'm here to help you translate your teaching goals into a digital project. 
                    Please tell me a bit about what you're imagining. Don't worry about technical details—just focus on the student experience and your subject matter.
                  </p>
                </div>

                <div className="p-10 space-y-8 bg-white">
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-bold text-nd-navy mb-2">What is your subject area or discipline?</label>
                      <p className="text-xs text-gray-500 mb-3">This helps me suggest examples that feel relevant to your specific field.</p>
                      <input 
                        type="text" 
                        placeholder="e.g. Organic Chemistry, Medieval History, Business Ethics..."
                        className="w-full border-2 border-gray-100 rounded-xl p-4 focus:outline-none focus:border-nd-gold transition-colors text-lg"
                        value={subjectArea}
                        onChange={(e) => setSubjectArea(e.target.value)}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-bold text-nd-navy mb-2">Describe your project idea</label>
                      <p className="text-xs text-gray-500 mb-3">Tell me about the learning experience you want to create. What should students do? What are the key topics?</p>
                      <textarea 
                        rows={5}
                        placeholder="e.g. I want to create a series of interactive modules that help students visualize molecular structures through 3D animations and self-assessment quizzes..."
                        className="w-full border-2 border-gray-100 rounded-xl p-4 focus:outline-none focus:border-nd-gold transition-colors text-lg resize-none"
                        value={projectDescription}
                        onChange={(e) => setProjectDescription(e.target.value)}
                      />
                    </div>
                  </div>

                  <button 
                    onClick={analyzeProject}
                    disabled={isAnalyzing || !projectDescription || !subjectArea}
                    className="w-full nd-button-primary py-6 text-xl flex items-center justify-center gap-3 shadow-lg shadow-nd-navy/10"
                  >
                    {isAnalyzing ? (
                      <><Loader2 className="w-6 h-6 animate-spin" /> Salonee is thinking...</>
                    ) : (
                      <><SaloneeIcon className="w-6 h-6" /> Analyze with Salonee</>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {step === 0.5 && aiSuggestions && (
            <motion.div
              key="ai-results"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="space-y-8"
            >
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="relative">
                  <SaloneeIcon className="w-20 h-20" />
                  <div className="absolute -bottom-1 -right-1 bg-green-500 w-5 h-5 rounded-full border-2 border-white" title="Salonee is online" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-nd-navy">Salonee's Recommendations</h2>
                  <p className="text-gray-600">I've analyzed your project for {subjectArea} and here's what I suggest.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2 space-y-6">
                  <div className="nd-card p-8 border-nd-gold bg-nd-gold/5 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-5">
                      <MessageSquare className="w-24 h-24" />
                    </div>
                    <h3 className="text-xl font-bold text-nd-navy mb-4 flex items-center gap-2">
                      <SaloneeIcon className="w-6 h-6" />
                      Salonee's Reasoning
                    </h3>
                    <p className="text-gray-700 leading-relaxed italic text-lg">
                      "{aiSuggestions.reasoning}"
                    </p>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-nd-navy flex items-center gap-2">
                      <Sparkles className="w-6 h-6 text-nd-gold" />
                      What's Possible in {subjectArea}
                    </h3>
                    <div className="grid grid-cols-1 gap-4">
                      {aiSuggestions.examples.map((example, i) => (
                        <div key={i} className="nd-card p-6 border-l-4 border-l-nd-gold bg-white shadow-sm hover:shadow-md transition-shadow">
                          <p className="text-gray-700">{example}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="nd-card p-8 text-center space-y-4 border-2 border-gray-50">
                    <div className="text-xs font-bold uppercase tracking-widest text-gray-400">Suggested Type</div>
                    {(() => {
                      const type = PROJECT_TYPES.find(t => t.id === aiSuggestions.type || t.label === aiSuggestions.type);
                      const Icon = type ? (IconMap[type.id] || Sparkles) : Sparkles;
                      return (
                        <>
                          <div className="p-4 bg-nd-gray rounded-full w-fit mx-auto">
                            <Icon className="w-8 h-8 text-nd-navy" />
                          </div>
                          <div>
                            <h4 className="text-xl font-bold">{type?.label || aiSuggestions.type}</h4>
                            {type && (
                              <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                                {type.description}
                              </p>
                            )}
                          </div>
                        </>
                      );
                    })()}
                  </div>

                  <div className="nd-card p-8 text-center space-y-4 border-2 border-gray-50">
                    <div className="text-xs font-bold uppercase tracking-widest text-gray-400">Suggested Size</div>
                    {(() => {
                      const size = PROJECT_SIZES.find(s => s.id === aiSuggestions.size || s.label === aiSuggestions.size);
                      return (
                        <>
                          <div className="text-5xl font-black text-nd-navy/20">{size?.id || aiSuggestions.size}</div>
                          <div>
                            <h4 className="text-xl font-bold">{size?.label || aiSuggestions.size}</h4>
                            {size && (
                              <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                                {size.description}
                              </p>
                            )}
                          </div>
                        </>
                      );
                    })()}
                  </div>

                  <div className="pt-8 border-t border-gray-100 space-y-6">
                    <div className="space-y-2">
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-widest text-center">Ready to proceed?</p>
                      <button 
                        onClick={() => {
                          const type = PROJECT_TYPES.find(t => t.id === aiSuggestions.type || t.label === aiSuggestions.type);
                          const size = PROJECT_SIZES.find(s => s.id === aiSuggestions.size || s.label === aiSuggestions.size);
                          setSelectedType(type?.id || 'module');
                          setSelectedSize(size?.id || 'S');
                          setStep(3);
                        }}
                        className="w-full nd-button-primary flex items-center justify-center gap-2 py-4 shadow-lg shadow-nd-navy/10"
                      >
                        Accept & View Journey <ChevronRight className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="space-y-3 text-center">
                      <p className="text-sm text-gray-500 italic">Not quite what you were thinking?</p>
                      <div className="flex flex-col gap-2">
                        <button 
                          onClick={() => setStep(0.2)}
                          className="text-sm text-nd-navy font-bold hover:text-nd-gold transition-colors"
                        >
                          Refine with Salonee
                        </button>
                        <button 
                          onClick={() => setStep(1)}
                          className="text-sm text-gray-400 hover:text-nd-navy transition-colors"
                        >
                          Explore Manually Instead
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
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
                  const Icon = IconMap[type.id] || Info;
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
                  <div className="flex items-center gap-3 pr-6 border-r border-white/10">
                    <Clock className="w-8 h-8 text-nd-gold" />
                    <div>
                      <p className="text-xs uppercase opacity-60 font-bold">Timeline</p>
                      <p className="text-2xl font-bold whitespace-nowrap">{totalWeeks} Weeks</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <UserCheck className="w-8 h-8 text-nd-gold" />
                    <div>
                      <p className="text-xs uppercase opacity-60 font-bold">Faculty Effort</p>
                      <p className="text-2xl font-bold whitespace-nowrap">{facultyEffort.min}-{facultyEffort.max} hrs</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative">
                {/* Connection Line */}
                <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 -translate-y-1/2 hidden md:block" />
                
                <div className="grid grid-cols-1 md:grid-cols-7 gap-4 relative">
                  {PROCESS_STEPS.map((procStep, idx) => {
                    const Icon = IconMap[procStep.icon] || Info;
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
                      {aiSuggestions ? `AI Generated Examples for ${subjectArea}` : 'Project Examples'}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {aiSuggestions 
                        ? 'Specific ways we can bring your vision to life.'
                        : `See how other faculty have implemented ${PROJECT_TYPES.find(t => t.id === selectedType)?.label} projects of this scale.`
                      }
                    </p>
                  </div>
                  {!aiSuggestions && (
                    <button className="nd-button-secondary flex items-center gap-2 text-sm">
                      View Examples on NDL Website <ExternalLink className="w-4 h-4" />
                    </button>
                  )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                  {aiSuggestions ? (
                    aiSuggestions.examples.map((example, i) => (
                      <div key={i} className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm flex flex-col gap-3 group transition-colors">
                        <div className="w-8 h-8 bg-nd-gold/10 rounded flex items-center justify-center text-nd-gold font-bold">
                          {i + 1}
                        </div>
                        <div className="text-sm text-gray-700 leading-relaxed">{example}</div>
                      </div>
                    ))
                  ) : (
                    [1, 2, 3].map(i => (
                      <div key={i} className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm flex items-center gap-4 group cursor-pointer hover:border-nd-gold transition-colors">
                        <div className="w-12 h-12 bg-nd-gray rounded flex items-center justify-center text-nd-navy font-bold group-hover:bg-nd-gold/10 group-hover:text-nd-gold">
                          {i}
                        </div>
                        <div className="text-sm font-medium">Example Project {i}</div>
                      </div>
                    ))
                  )}
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
                        const Icon = IconMap[detailedStep.icon] || Info;
                        return <Icon className="w-10 h-10" />;
                      })()}
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold">{detailedStep.title}</h2>
                      <p className="opacity-80">Phase {PROCESS_STEPS.indexOf(detailedStep) + 1} of {PROCESS_STEPS.length}</p>
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
                        <h4 className="font-bold text-nd-navy uppercase tracking-wider text-sm">Key Tasks</h4>
                        <div className="space-y-6">
                          {detailedStep.taskGroups.map((group, i) => (
                            <div key={i} className="space-y-3">
                              {group.heading && (
                                <h5 className="font-bold text-nd-navy/70 text-xs uppercase tracking-widest">{group.heading}</h5>
                              )}
                              <ul className="space-y-2">
                                {group.items.map((item, j) => (
                                  <li key={j} className="flex items-center gap-3 text-gray-600">
                                    <div className="w-2 h-2 bg-nd-gold rounded-full" />
                                    {item}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="pt-8 space-y-4">
                        <h4 className="font-bold text-nd-navy uppercase tracking-wider text-sm">Artifacts</h4>
                        <ul className="space-y-3">
                          {detailedStep.artifacts.map((item, i) => (
                            <li key={i} className="flex items-center gap-3 text-gray-600">
                              <div className="w-2 h-2 bg-nd-navy/20 rounded-full" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    
                    <div className="space-y-6">
                      <div className="bg-nd-gray p-8 rounded-2xl space-y-4">
                        <h4 className="font-bold text-nd-navy">Project Duration</h4>
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

                      <div className="bg-nd-navy/5 p-8 rounded-2xl border border-nd-navy/10 space-y-4">
                        <h4 className="font-bold text-nd-navy">Faculty Effort</h4>
                        <div className="flex items-center gap-3">
                          <UserCheck className="w-6 h-6 text-nd-navy" />
                          <span className="text-2xl font-bold">
                            {detailedStep.baseFacultyHours * (PROJECT_SIZES.find(s => s.id === selectedSize)?.multiplier || 1)} Hours
                          </span>
                        </div>
                        <p className="text-xs text-gray-500">
                          Estimated faculty time for this phase.
                        </p>
                      </div>

                      <div className="bg-nd-gold/10 p-8 rounded-2xl space-y-4">
                        <h4 className="font-bold text-nd-navy">Faculty Expectations</h4>
                        <p className="text-sm text-gray-700 leading-relaxed">
                          {detailedStep.facultyRole}
                        </p>
                        <button className="text-nd-navy font-bold text-sm flex items-center gap-2 hover:gap-3 transition-all pt-2">
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
