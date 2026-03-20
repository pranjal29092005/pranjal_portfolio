import React, { useState, useEffect } from 'react';
import { Menu, X, Download, Mail, Github, Linkedin, ExternalLink, ChevronDown } from 'lucide-react';
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
      color: 'from-blue-500 to-cyan-500',
    },
    {
      category: 'Web Frameworks',
      items: ['React', 'Next.js', 'Flask', 'FastAPI', 'Streamlit', 'HTML/CSS'],
      color: 'from-purple-500 to-pink-500',
    },
    {
      category: 'Tools & Platforms',
      items: ['Docker', 'AWS', 'Git', 'Hugging Face', 'Ollama', 'Power BI', 'Postman'],
      color: 'from-green-500 to-emerald-500',
    },
    {
      category: 'Languages',
      items: ['Python', 'JavaScript', 'SQL', 'C++', 'Java', 'DSA'],
      color: 'from-orange-500 to-red-500',
    },
  ];

  const experience = [
    {
      role: 'AI Research Intern',
      company: 'IIT Gandhinagar - LINGO Research Group',
      period: 'Sep 2025 - Present',
      description: 'Conducting dataset curation and linguistic annotation for Hindi-English code-mixed text. Designing experiments with LLMs for multilingual NLP.',
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

  const resumeUrl = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663440647979/ky738dGJFsLLgd4N9HazKu/Pranjal_Yadav(9)_6e0b7453.pdf';

  const achievements = [
    {
      title: 'LJ Hackavote\'25 Champions',
      subtitle: '1st Place - 250+ Teams',
      description: 'Multi-channel scam detection system using NLP & ML',
      prize: '₹40,000 + ₹20,000 IntelliJ License',
    },
    {
      title: 'SQL 50 Badge',
      subtitle: 'LeetCode',
      description: 'Advanced SQL proficiency certification',
    },
    {
      title: 'SQL Gold Badge',
      subtitle: 'HackerRank',
      description: 'Expert-level SQL problem solving',
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <ParticleBackground />

      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-background/80 backdrop-blur-md border-b border-border' : 'bg-transparent'}`}>
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold gradient-text">Pranjal</div>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-8 items-center">
            {['home', 'projects', 'skills', 'experience', 'contact'].map(item => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className={`capitalize transition-all duration-300 ease-out ${activeSection === item ? 'text-primary font-semibold' : 'hover:text-primary'}`}
              >
                {item}
              </button>
            ))}
            <Button
              onClick={toggleTheme}
              variant="outline"
              size="sm"
              className="rounded-full"
            >
              {theme === 'dark' ? '☀️' : '🌙'}
            </Button>
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden flex items-center gap-4">
            <Button
              onClick={toggleTheme}
              variant="outline"
              size="sm"
              className="rounded-full"
            >
              {theme === 'dark' ? '☀️' : '🌙'}
            </Button>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden bg-background/95 backdrop-blur-md border-b border-border">
            <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
              {['home', 'projects', 'skills', 'experience', 'contact'].map(item => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className="capitalize text-left hover:text-primary transition-all duration-300 ease-out"
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
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 gradient-text">
              Full Stack AI/ML Developer
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Building intelligent solutions with cutting-edge AI, machine learning, and web technologies. Transforming ideas into production-ready applications.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button
                onClick={() => scrollToSection('projects')}
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
              >
                View My Work
                <ChevronDown className="ml-2" size={20} />
              </Button>
              <Button
                onClick={() => scrollToSection('contact')}
                size="lg"
                variant="outline"
              >
                Get In Touch
                <Mail className="ml-2" size={20} />
              </Button>
            </div>

            <div className="flex justify-center gap-6 mb-16">
              <a href="https://github.com/pranjal29092005" target="_blank" rel="noopener noreferrer" className="transition-all duration-300 ease-out hover:shadow-lg hover:shadow-blue-600/50 p-3 rounded-full bg-card hover:bg-primary/10 transition-all duration-300 ease-out">
                <Github size={24} />
              </a>
              <a href="https://www.linkedin.com/in/pranjal-yadav-4507bb310" target="_blank" rel="noopener noreferrer" className="transition-all duration-300 ease-out hover:shadow-lg hover:shadow-blue-600/50 p-3 rounded-full bg-card hover:bg-primary/10 transition-all duration-300 ease-out">
                <Linkedin size={24} />
              </a>
              <a href="mailto:pranjalyadav92905@gmail.com" className="transition-all duration-300 ease-out hover:shadow-lg hover:shadow-blue-600/50 p-3 rounded-full bg-card hover:bg-primary/10 transition-all duration-300 ease-out">
                <Mail size={24} />
              </a>
            </div>

            {/* Scroll indicator */}
            <div className="animate-bounce">
              <ChevronDown size={32} className="mx-auto text-primary" />
            </div>
          </div>
        </div>
      </section>

      {/* Resume Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Download My Resume
          </h2>

          <div className="max-w-2xl mx-auto">
            <div className="bg-white/10 dark:bg-black/10 backdrop-blur-md border border-white/20 dark:border-white/10 rounded-lg p-8 text-center">
              <p className="text-muted-foreground mb-6">
                Get a comprehensive overview of my experience, skills, and achievements. Download my resume to learn more about my professional background.
              </p>
              <a
                href={resumeUrl}
                download="Pranjal_Yadav_Resume.pdf"
                className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-xl"
              >
                <Download size={20} />
                Download Resume (PDF)
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-card/50 relative">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Featured Projects
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, idx) => (
              <div
                key={idx}
                className="group bg-white/10 dark:bg-black/10 backdrop-blur-md border border-white/20 dark:border-white/10 rounded-lg p-6 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-xl border border-border/50 hover:border-primary/50 transition-all duration-300 ease-out"
              >
                <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-all duration-300 ease-out">
                  {project.title}
                </h3>
                <p className="text-muted-foreground mb-4 line-clamp-2">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech, i) => (
                    <span key={i} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.stats.map((stat, i) => (
                    <span key={i} className="text-xs text-muted-foreground border border-border/50 px-2 py-1 rounded">
                      {stat}
                    </span>
                  ))}
                </div>

                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-primary hover:text-primary/80 transition-all duration-300 ease-out"
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
      <section id="skills" className="py-20 relative">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
            Technical Skills
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {skills.map((skillGroup, idx) => (
              <div key={idx} className="group">
                <div className={`text-2xl font-bold mb-6 bg-gradient-to-r ${skillGroup.color} bg-clip-text text-transparent`}>
                  {skillGroup.category}
                </div>
                <div className="flex flex-wrap gap-3">
                  {skillGroup.items.map((skill, i) => (
                    <div
                      key={i}
                      className="px-4 py-2 rounded-full bg-white/10 dark:bg-black/10 backdrop-blur-md border border-white/20 dark:border-white/10 border border-border/50 hover:border-primary/50 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-xl transition-all duration-300 ease-out text-sm font-medium"
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
      <section id="experience" className="py-20 bg-card/50 relative">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Professional Experience
          </h2>

          <div className="max-w-3xl mx-auto">
            {experience.map((exp, idx) => (
              <div key={idx} className="relative pl-8 pb-12 border-l-2 border-primary/30 last:pb-0">
                <div className="absolute -left-4 top-0 w-6 h-6 rounded-full bg-primary border-4 border-background"></div>

                <div className="bg-white/10 dark:bg-black/10 backdrop-blur-md border border-white/20 dark:border-white/10 rounded-lg p-6 border border-border/50 hover:border-primary/50 transition-all duration-300 ease-out">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-3">
                    <div>
                      <h3 className="text-xl font-bold text-primary">{exp.role}</h3>
                      <p className="text-muted-foreground">{exp.company}</p>
                    </div>
                    <span className="text-sm text-muted-foreground mt-2 md:mt-0">{exp.period}</span>
                  </div>
                  <p className="text-muted-foreground">{exp.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
            Achievements & Awards
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {achievements.map((achievement, idx) => (
              <div
                key={idx}
                className="bg-white/10 dark:bg-black/10 backdrop-blur-md border border-white/20 dark:border-white/10 rounded-lg p-6 border border-border/50 hover:border-primary/50 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-xl transition-all duration-300 ease-out text-center"
              >
                <div className="text-4xl mb-4">🏆</div>
                <h3 className="text-xl font-bold mb-2">{achievement.title}</h3>
                <p className="text-primary font-semibold mb-2">{achievement.subtitle}</p>
                <p className="text-muted-foreground text-sm mb-3">{achievement.description}</p>
                {achievement.prize && (
                  <p className="text-sm font-semibold text-green-600 dark:text-green-400">{achievement.prize}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-card/50 relative">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Get In Touch
          </h2>

          <div className="max-w-2xl mx-auto">
            <form onSubmit={handleFormSubmit} className="bg-white/10 dark:bg-black/10 backdrop-blur-md border border-white/20 dark:border-white/10 rounded-lg p-8 border border-border/50 space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleFormChange}
                    required
                    className="w-full px-4 py-2 rounded-lg bg-background border border-border focus:border-primary focus:outline-none transition-all duration-300 ease-out"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleFormChange}
                    required
                    className="w-full px-4 py-2 rounded-lg bg-background border border-border focus:border-primary focus:outline-none transition-all duration-300 ease-out"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleFormChange}
                  required
                  className="w-full px-4 py-2 rounded-lg bg-background border border-border focus:border-primary focus:outline-none transition-all duration-300 ease-out"
                  placeholder="What's this about?"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleFormChange}
                  required
                  rows={5}
                  className="w-full px-4 py-2 rounded-lg bg-background border border-border focus:border-primary focus:outline-none transition-all duration-300 ease-out resize-none"
                  placeholder="Tell me about your project or inquiry..."
                />
              </div>

              <Button
                type="submit"
                disabled={contactMutation.isPending}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
              >
                {contactMutation.isPending ? 'Sending...' : 'Send Message'}
              </Button>
            </form>

            <div className="mt-12 grid md:grid-cols-3 gap-6 text-center">
              <div>
                <Mail className="mx-auto mb-3 text-primary" size={32} />
                <p className="text-muted-foreground">pranjalyadav92905@gmail.com</p>
              </div>
              <div>
                <Github className="mx-auto mb-3 text-primary" size={32} />
                <p className="text-muted-foreground">github.com/pranjal29092005</p>
              </div>
              <div>
                <Linkedin className="mx-auto mb-3 text-primary" size={32} />
                <p className="text-muted-foreground">pranjal-yadav-4507bb310</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-border bg-card/50">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>© 2026 Pranjal Yadav. All rights reserved. Built with React, Tailwind CSS, and ❤️</p>
        </div>
      </footer>
    </div>
  );
}
