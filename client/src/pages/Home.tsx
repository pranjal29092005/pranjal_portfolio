import React, { useState, useEffect } from 'react';
import { Menu, X, Download, Mail, Github, Linkedin, ExternalLink, ChevronDown, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ParticleBackground } from '@/components/ParticleBackground';
import { useTheme } from '@/contexts/ThemeContext';
import { trpc } from '@/lib/trpc';
import { toast } from 'sonner';

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const contactMutation = trpc.contact.submit.useMutation();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await contactMutation.mutateAsync(formData);
      toast.success('Message sent successfully! I\'ll get back to you soon.');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      toast.error('Failed to send message. Please try again.');
    }
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
      setIsMenuOpen(false);
    }
  };

  const resumeUrl = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663440647979/ky738dGJFsLLgd4N9HazKu/Pranjal_Yadav(9)_6e0b7453.pdf';

  const projects = [
    {
      title: 'Coastal Threat Detection System',
      description: 'AI-powered system predicting and preventing 6 major coastal threats using real-time satellite data.',
      tech: ['React', 'FastAPI', 'Redis', 'MongoDB', 'ML'],
      stats: ['94%+ Accuracy', '24-48 hr Alerts', '60% Cost Reduction'],
      link: 'https://github.com/pranjal29092005',
    },
    {
      title: 'AI-Powered Mock Interview Platform',
      description: 'Voice-based interview simulations with real-time adaptive feedback and analytics.',
      tech: ['Next.js', 'Tailwind CSS', 'Firebase', 'Stripe'],
      stats: ['Real-time Feedback', 'Role-specific Modes', 'Subscription Model'],
      link: 'https://github.com/pranjal29092005',
    },
    {
      title: 'LISS-4 Satellite Imagery Analysis',
      description: 'Full-stack web application for monitoring and visualizing satellite-detected changes.',
      tech: ['Google Earth Engine', 'Python', 'Jupyter', 'Geospatial Analysis'],
      stats: ['Real-time Monitoring', 'AOI Analysis', 'Research-ready'],
      link: 'https://github.com/pranjal29092005',
    },
  ];

  const skills = [
    {
      category: 'AI/ML',
      items: ['LLMs', 'NLP', 'Transformers', 'Deep Learning', 'CNN', 'Generative AI', 'RAG Systems', 'Fine-tuning'],
      icon: '',
    },
    {
      category: 'Web Frameworks',
      items: ['React', 'Next.js', 'Flask', 'FastAPI', 'Streamlit', 'HTML/CSS'],
      icon: '',
    },
    {
      category: 'Tools & Platforms',
      items: ['Docker', 'AWS', 'Git', 'Hugging Face', 'Ollama', 'Power BI', 'Postman'],
      icon: '',
    },
    {
      category: 'Languages',
      items: ['Python', 'JavaScript', 'SQL', 'C++', 'Java', 'DSA'],
      icon: '',
    },
  ];

  const experience = [
    {
      role: 'Junior Data Scientist',
      company: 'FARMFIX AGI PVT LTD',
      period: 'Dec 2025 - Present',
      description: 'Developing AI automation solutions and building intelligent systems. Working on artificial intelligence projects with focus on real-world applications and scalable deployment.',
    },
    {
      role: 'AI Research Intern',
      company: 'IIT Gandhinagar - LINGO Research Group',
      period: 'Sep 2025 - Present',
      description: 'Conducting dataset curation and linguistic annotation for Hindi-English code-mixed text. Designing experiments with LLMs for multilingual NLP.',
    },
    {
      role: 'Open Source Contributor',
      company: 'AOSSIE',
      period: 'Nov 2025 - Jan 2026',
      description: 'Contributed to the Resonate Backend project. Collaborated with mentors to review PRs and improve documentation. Strengthened understanding of open-source workflows, Git branching, and CI/CD pipelines.',
    },
    {
      role: 'Google Student Ambassador',
      company: 'Google',
      period: 'Aug 2025 - Present',
      description: 'Driving AI innovation and campus leadership with Google Gemini initiatives. Leading workshops and tech talks across college fests.',
    },
    {
      role: 'Freelancing Coding Expert (AI Model Trainer)',
      company: 'Outlier',
      period: 'Jan 2025 - July 2025',
      description: 'Fine-tuned LLMs using PEFT and LoRA techniques. Developed evaluation metrics for code-generation models. Implemented RAG pipelines.',
    },
  ];

  const achievements = [
    {
      title: 'LJ Hackavote\'25 Champions',
      subtitle: '1st Place - 250+ Teams',
      description: 'Multi-channel scam detection system using NLP & ML',
      prize: '₹40,000 + ₹20,000 IntelliJ License',
    },
    {
      title: 'AIDTM Hackathon Runner-Up',
      subtitle: '2nd Place - 200+ Teams',
      description: 'Automated Wagon Detection using Computer Vision. Real-time detection with damage inspection under varying environmental conditions. Optimized model accuracy while maintaining strict latency requirements.',
      prize: '₹50,000+ Prize and Recognition',
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <ParticleBackground />

      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-black/80 backdrop-blur-md border-b border-purple-500/30' : 'bg-transparent'}`}>
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-purple-500 to-pink-500 bg-clip-text text-transparent drop-shadow-lg" style={{ textShadow: '0 0 20px rgba(168, 85, 247, 0.8)' }}>
            PRANJAL
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-8 items-center">
            {['home', 'projects', 'skills', 'experience', 'contact'].map(item => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className={`capitalize transition-all duration-300 font-semibold ${activeSection === item ? 'text-purple-400 drop-shadow-lg' : 'text-gray-300 hover:text-purple-400'}`}
                style={activeSection === item ? { textShadow: '0 0 10px rgba(168, 85, 247, 0.8)' } : {}}
              >
                {item}
              </button>
            ))}
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden flex items-center gap-4">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={24} className="text-purple-400" /> : <Menu size={24} className="text-purple-400" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden bg-black/95 backdrop-blur-md border-b border-purple-500/30">
            <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
              {['home', 'projects', 'skills', 'experience', 'contact'].map(item => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className="capitalize text-left text-gray-300 hover:text-purple-400 transition-all duration-300 font-semibold"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        <div className="container mx-auto px-4 z-10">
          <div className="max-w-4xl mx-auto text-center animate-in">
            <div className="mb-6 inline-block">
              <span className="text-purple-400 font-bold text-lg drop-shadow-lg" style={{ textShadow: '0 0 10px rgba(168, 85, 247, 0.8)' }}>4X HACKATHON WINNER | FULL STACK AI/ML DEVELOPER</span>
            </div>
            
            <h1 className="text-6xl md:text-7xl font-black mb-6 leading-tight" style={{
              background: 'linear-gradient(135deg, #a855f7 0%, #ec4899 50%, #a855f7 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              textShadow: '0 0 30px rgba(168, 85, 247, 0.5)',
              filter: 'drop-shadow(0 0 20px rgba(168, 85, 247, 0.4))'
            }}>
              Building Intelligent Solutions
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
              Transforming ideas into production-ready applications with cutting-edge AI, machine learning, and web technologies.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button
                onClick={() => scrollToSection('projects')}
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold border-0 shadow-lg hover:shadow-purple-500/50"
                style={{ boxShadow: '0 0 20px rgba(168, 85, 247, 0.5)' }}
              >
                View My Work
                <ChevronDown className="ml-2" size={20} />
              </Button>
              <Button
                onClick={() => scrollToSection('contact')}
                size="lg"
                className="border-2 border-purple-500 bg-transparent text-purple-400 hover:bg-purple-500/10 font-bold"
                style={{ boxShadow: '0 0 15px rgba(168, 85, 247, 0.3)' }}
              >
                Get In Touch
                <Mail className="ml-2" size={20} />
              </Button>
            </div>

            <div className="flex justify-center gap-6 mb-16">
              <a href="https://github.com/pranjal29092005" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-purple-500/10 border border-purple-500/50 hover:border-purple-400 hover:bg-purple-500/20 transition-all duration-300" style={{ boxShadow: '0 0 15px rgba(168, 85, 247, 0.3)' }}>
                <Github size={24} className="text-purple-400" />
              </a>
              <a href="https://www.linkedin.com/in/pranjal-yadav-4507bb310" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-purple-500/10 border border-purple-500/50 hover:border-purple-400 hover:bg-purple-500/20 transition-all duration-300" style={{ boxShadow: '0 0 15px rgba(168, 85, 247, 0.3)' }}>
                <Linkedin size={24} className="text-purple-400" />
              </a>
              <a href="mailto:pranjalyadav92905@gmail.com" className="p-3 rounded-full bg-purple-500/10 border border-purple-500/50 hover:border-purple-400 hover:bg-purple-500/20 transition-all duration-300" style={{ boxShadow: '0 0 15px rgba(168, 85, 247, 0.3)' }}>
                <Mail size={24} className="text-purple-400" />
              </a>
            </div>

            {/* Scroll indicator */}
            <div className="animate-bounce">
              <ChevronDown size={32} className="mx-auto text-purple-400" style={{ textShadow: '0 0 10px rgba(168, 85, 247, 0.8)' }} />
            </div>
          </div>
        </div>
      </section>

      {/* Resume Section */}
      <section className="py-20 relative border-t border-purple-500/20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-black mb-16 text-center" style={{
            background: 'linear-gradient(135deg, #a855f7 0%, #ec4899 50%, #a855f7 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            textShadow: '0 0 30px rgba(168, 85, 247, 0.5)',
            filter: 'drop-shadow(0 0 20px rgba(168, 85, 247, 0.4))'
          }}>
            Download My Resume
          </h2>

          <div className="max-w-2xl mx-auto">
            <div className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 backdrop-blur-md border border-purple-500/50 rounded-lg p-8 text-center" style={{ boxShadow: '0 0 30px rgba(168, 85, 247, 0.3)' }}>
              <p className="text-gray-300 mb-6">
                Get a comprehensive overview of my experience, skills, and achievements. Download my resume to learn more about my professional background.
              </p>
              <a
                href={resumeUrl}
                download="Pranjal_Yadav_Resume.pdf"
                className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold rounded-lg transition-all duration-300 hover:-translate-y-1"
                style={{ boxShadow: '0 0 20px rgba(168, 85, 247, 0.5)' }}
              >
                <Download size={20} />
                Download Resume (PDF)
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 relative border-t border-purple-500/20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-black mb-16 text-center" style={{
            background: 'linear-gradient(135deg, #a855f7 0%, #ec4899 50%, #a855f7 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            textShadow: '0 0 30px rgba(168, 85, 247, 0.5)',
            filter: 'drop-shadow(0 0 20px rgba(168, 85, 247, 0.4))'
          }}>
            Featured Projects
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, idx) => (
              <div
                key={idx}
                className="group bg-gradient-to-br from-purple-900/20 to-pink-900/20 backdrop-blur-md rounded-lg p-6 border border-purple-500/50 hover:border-purple-400 transition-all duration-300 hover:-translate-y-2"
                style={{ boxShadow: '0 0 20px rgba(168, 85, 247, 0.2)' }}
              >
                <h3 className="text-xl font-bold mb-3 text-purple-300 group-hover:text-purple-200 transition-all duration-300">
                  {project.title}
                </h3>
                <p className="text-gray-300 mb-4">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech, i) => (
                    <span key={i} className="text-xs bg-purple-500/30 text-purple-200 px-2 py-1 rounded-full border border-purple-500/50">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.stats.map((stat, i) => (
                    <span key={i} className="text-xs text-purple-300 border border-purple-500/50 px-2 py-1 rounded">
                      {stat}
                    </span>
                  ))}
                </div>

                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-purple-400 hover:text-purple-200 transition-all duration-300 font-semibold"
                >
                  View on GitHub
                  <ExternalLink size={16} className="ml-2" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 relative border-t border-purple-500/20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-black mb-16 text-center" style={{
            background: 'linear-gradient(135deg, #a855f7 0%, #ec4899 50%, #a855f7 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            textShadow: '0 0 30px rgba(168, 85, 247, 0.5)',
            filter: 'drop-shadow(0 0 20px rgba(168, 85, 247, 0.4))'
          }}>
            Technical Skills
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {skills.map((skillGroup, idx) => (
              <div key={idx} className="group">
                <div className="text-2xl font-bold mb-6 text-purple-300">
                  {skillGroup.category}
                </div>
                <div className="flex flex-wrap gap-3">
                  {skillGroup.items.map((skill, i) => (
                    <div
                      key={i}
                      className="px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/50 hover:border-purple-400 hover:bg-purple-500/20 transition-all duration-300 text-sm font-medium text-purple-200 hover:text-purple-100"
                      style={{ boxShadow: '0 0 10px rgba(168, 85, 247, 0.2)' }}
                    >
                      {skill}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 relative border-t border-purple-500/20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-black mb-16 text-center" style={{
            background: 'linear-gradient(135deg, #a855f7 0%, #ec4899 50%, #a855f7 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            textShadow: '0 0 30px rgba(168, 85, 247, 0.5)',
            filter: 'drop-shadow(0 0 20px rgba(168, 85, 247, 0.4))'
          }}>
            Professional Experience
          </h2>

          <div className="max-w-3xl mx-auto">
            {experience.map((exp, idx) => (
              <div key={idx} className="relative pl-8 pb-12 border-l-2 border-purple-500/50 last:pb-0">
                <div className="absolute -left-4 top-0 w-6 h-6 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 border-4 border-black" style={{ boxShadow: '0 0 15px rgba(168, 85, 247, 0.8)' }}></div>

                <div className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 backdrop-blur-md rounded-lg p-6 border border-purple-500/50 hover:border-purple-400 transition-all duration-300" style={{ boxShadow: '0 0 20px rgba(168, 85, 247, 0.2)' }}>
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-3">
                    <div>
                      <h3 className="text-xl font-bold text-purple-300">{exp.role}</h3>
                      <p className="text-purple-400/70">{exp.company}</p>
                    </div>
                    <span className="text-sm text-purple-400/70 mt-2 md:mt-0">{exp.period}</span>
                  </div>
                  <p className="text-gray-300">{exp.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-20 relative border-t border-purple-500/20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-black mb-16 text-center" style={{
            background: 'linear-gradient(135deg, #a855f7 0%, #ec4899 50%, #a855f7 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            textShadow: '0 0 30px rgba(168, 85, 247, 0.5)',
            filter: 'drop-shadow(0 0 20px rgba(168, 85, 247, 0.4))'
          }}>
            Achievements & Awards
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {achievements.map((achievement, idx) => (
              <div
                key={idx}
                className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 backdrop-blur-md rounded-lg p-6 border border-purple-500/50 hover:border-purple-400 hover:-translate-y-2 transition-all duration-300 text-center"
                style={{ boxShadow: '0 0 20px rgba(168, 85, 247, 0.2)' }}
              >
                <h3 className="text-xl font-bold mb-2 text-purple-300">{achievement.title}</h3>
                <p className="text-purple-400 font-semibold mb-2">{achievement.subtitle}</p>
                <p className="text-gray-300 text-sm mb-3">{achievement.description}</p>
                {achievement.prize && (
                  <p className="text-sm font-semibold text-pink-400">{achievement.prize}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 relative border-t border-purple-500/20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-black mb-16 text-center" style={{
            background: 'linear-gradient(135deg, #a855f7 0%, #ec4899 50%, #a855f7 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            textShadow: '0 0 30px rgba(168, 85, 247, 0.5)',
            filter: 'drop-shadow(0 0 20px rgba(168, 85, 247, 0.4))'
          }}>
            Get In Touch
          </h2>

          <div className="max-w-2xl mx-auto">
            <form onSubmit={handleFormSubmit} className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 backdrop-blur-md border border-purple-500/50 rounded-lg p-8 space-y-6" style={{ boxShadow: '0 0 30px rgba(168, 85, 247, 0.3)' }}>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold mb-2 text-purple-300">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleFormChange}
                    required
                    className="w-full px-4 py-2 rounded-lg bg-black/50 border border-purple-500/50 text-white placeholder-gray-500 focus:border-purple-400 focus:outline-none transition-all duration-300"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2 text-purple-300">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleFormChange}
                    required
                    className="w-full px-4 py-2 rounded-lg bg-black/50 border border-purple-500/50 text-white placeholder-gray-500 focus:border-purple-400 focus:outline-none transition-all duration-300"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold mb-2 text-purple-300">Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleFormChange}
                  required
                  className="w-full px-4 py-2 rounded-lg bg-black/50 border border-purple-500/50 text-white placeholder-gray-500 focus:border-purple-400 focus:outline-none transition-all duration-300"
                  placeholder="What's this about?"
                />
              </div>

              <div>
                <label className="block text-sm font-bold mb-2 text-purple-300">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleFormChange}
                  required
                  rows={5}
                  className="w-full px-4 py-2 rounded-lg bg-black/50 border border-purple-500/50 text-white placeholder-gray-500 focus:border-purple-400 focus:outline-none transition-all duration-300 resize-none"
                  placeholder="Tell me about your project or inquiry..."
                />
              </div>

              <Button
                type="submit"
                disabled={contactMutation.isPending}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold border-0"
                style={{ boxShadow: '0 0 20px rgba(168, 85, 247, 0.5)' }}
              >
                {contactMutation.isPending ? 'Sending...' : 'Send Message'}
              </Button>
            </form>

            <div className="mt-12 grid md:grid-cols-3 gap-6 text-center">
              <div>
                <Mail className="mx-auto mb-3 text-purple-400" size={32} style={{ filter: 'drop-shadow(0 0 10px rgba(168, 85, 247, 0.8))' }} />
                <p className="text-gray-300">pranjalyadav92905@gmail.com</p>
              </div>
              <div>
                <Github className="mx-auto mb-3 text-purple-400" size={32} style={{ filter: 'drop-shadow(0 0 10px rgba(168, 85, 247, 0.8))' }} />
                <p className="text-gray-300">github.com/pranjal29092005</p>
              </div>
              <div>
                <Linkedin className="mx-auto mb-3 text-purple-400" size={32} style={{ filter: 'drop-shadow(0 0 10px rgba(168, 85, 247, 0.8))' }} />
                <p className="text-gray-300">pranjal-yadav-4507bb310</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-purple-500/20 bg-black/50">
        <div className="container mx-auto px-4 text-center text-gray-400">
          <p>© 2026 Pranjal Yadav. All rights reserved. Built with React, Tailwind CSS, and passion for innovation.</p>
        </div>
      </footer>
    </div>
  );
}
