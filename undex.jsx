import React, { useState, useEffect, useRef } from 'react';
import { Moon, Sun, Menu, X, ExternalLink, Mail, Linkedin, Github, Calendar } from 'lucide-react';

const Portfolio = () => {
const [isDark, setIsDark] = useState(true);
const [isMenuOpen, setIsMenuOpen] = useState(false);
const [scrollY, setScrollY] = useState(0);
const canvasRef = useRef(null);

useEffect(() => {
const handleScroll = () => setScrollY(window.scrollY);
window.addEventListener('scroll', handleScroll);
return () => window.removeEventListener('scroll', handleScroll);
}, []);

// 3D Canvas Animation
useEffect(() => {
const canvas = canvasRef.current;
if (!canvas) return;

const ctx = canvas.getContext('2d');
const resizeCanvas = () => {
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
};
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const nodes = [];
const nodeCount = 40;

for (let i = 0; i < nodeCount; i++) { nodes.push({ x: Math.random() * canvas.width, y: Math.random() * canvas.height,
    vx: (Math.random() - 0.5) * 0.3, vy: (Math.random() - 0.5) * 0.3, radius: Math.random() * 3 + 2 }); } const
    animate=()=> {
    ctx.fillStyle = isDark ? 'rgba(17, 24, 39, 0.1)' : 'rgba(249, 250, 251, 0.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const cameraOffset = scrollY * 0.05;

    nodes.forEach((node, i) => {
    node.x += node.vx;
    node.y += node.vy;

    if (node.x < 0 || node.x> canvas.width) node.vx *= -1;
        if (node.y < 0 || node.y> canvas.height) node.vy *= -1;

            ctx.beginPath();
            ctx.arc(node.x, node.y - cameraOffset, node.radius, 0, Math.PI * 2);
            ctx.fillStyle = isDark ? 'rgba(20, 184, 166, 0.6)' : 'rgba(20, 184, 166, 0.5)';
            ctx.fill();

            nodes.slice(i + 1).forEach(other => {
            const dx = other.x - node.x;
            const dy = other.y - node.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 150) { ctx.beginPath(); ctx.moveTo(node.x, node.y - cameraOffset); ctx.lineTo(other.x, other.y -
                cameraOffset); ctx.strokeStyle=isDark ? `rgba(20, 184, 166, ${0.2 * (1 - dist / 150)})` : `rgba(20, 184,
                166, ${0.15 * (1 - dist / 150)})`; ctx.lineWidth=1; ctx.stroke(); } }); });
                requestAnimationFrame(animate); }; animate(); return ()=> window.removeEventListener('resize',
                resizeCanvas);
                }, [isDark, scrollY]);

                const projects = [
                {
                title: "E-commerce Order Automation System",
                challenge: "Manual order processing causing 4-hour delays and frequent errors in fulfillment",
                solution: "Built n8n workflow integrating Shopify, Zoho CRM, and shipping APIs with real-time inventory
                sync",
                result: "Reduced processing time by 87% and eliminated 95% of manual errors",
                metrics: ["87% faster processing", "95% error reduction", "$12K monthly savings"],
                tech: ["n8n", "Shopify API", "Zoho CRM", "Webhook Integration"]
                },
                {
                title: "Lead Qualification AI Assistant",
                challenge: "Sales team overwhelmed with 500+ unqualified leads per week",
                solution: "Deployed LangChain-powered AI agent with n8n to score, categorize, and route leads
                automatically",
                result: "Increased qualified lead conversion rate from 12% to 38%",
                metrics: ["216% conversion increase", "20 hours saved weekly", "40% revenue growth"],
                tech: ["n8n", "LangChain", "OpenAI API", "Zoho CRM"]
                },
                {
                title: "Multi-Platform Content Distribution",
                challenge: "Content team spending 15 hours weekly on manual cross-posting",
                solution: "Created n8n automation pipeline distributing content across LinkedIn, Twitter, and email with
                custom formatting",
                result: "Reduced content distribution time from 15 hours to 30 minutes per week",
                metrics: ["96% time reduction", "3x content output", "45% engagement boost"],
                tech: ["n8n", "Social Media APIs", "RSS Integration", "Scheduling Automation"]
                }
                ];

                const reviews = [
                {
                name: "Sarah Mitchell",
                role: "Operations Director, TechFlow Inc",
                review: "Golam transformed our chaotic workflow into a seamless automation system. The n8n solutions he
                built saved us countless hours and significantly reduced errors.",
                rating: 5
                },
                {
                name: "Marcus Chen",
                role: "CEO, DataSync Solutions",
                review: "Outstanding expertise in AI automation. The lead qualification system Golam built increased our
                conversion rates dramatically. Highly recommended!",
                rating: 5
                },
                {
                name: "Emily Rodriguez",
                role: "Marketing Manager, GrowthLab",
                review: "Professional, responsive, and incredibly skilled. Golam's automation solutions have been
                game-changing for our content distribution strategy.",
                rating: 5
                }
                ];

                const scrollToSection = (id) => {
                document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
                setIsMenuOpen(false);
                };

                return (
                <div className={`min-h-screen transition-colors duration-300 ${isDark ? 'bg-gray-900 text-gray-100'
                    : 'bg-gray-50 text-gray-900' }`}>
                    <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }} />

                    {/* Sticky Navigation */}
                    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isDark ? 'bg-gray-900/95'
                        : 'bg-white/95' } backdrop-blur-sm border-b ${isDark ? 'border-gray-800' : 'border-gray-200'
                        }`}>
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="flex justify-between items-center h-16">
                                <div className="font-bold text-xl text-teal-500">GOLAM KIBRYA</div>

                                <div className="hidden md:flex items-center space-x-8">
                                    <button onClick={()=> scrollToSection('home')} className="hover:text-teal-500
                                        transition-colors">Home</button>
                                    <button onClick={()=> scrollToSection('projects')} className="hover:text-teal-500
                                        transition-colors">Projects</button>
                                    <button onClick={()=> scrollToSection('reviews')} className="hover:text-teal-500
                                        transition-colors">Reviews</button>
                                    <button onClick={()=> scrollToSection('contact')} className="hover:text-teal-500
                                        transition-colors">Contact Me</button>
                                    <button
                                        className="bg-teal-500 text-white px-6 py-2 rounded-lg hover:bg-teal-600 transition-colors font-semibold">
                                        HIRE ME
                                    </button>
                                    <button onClick={()=> setIsDark(!isDark)} className="p-2 rounded-lg
                                        hover:bg-gray-800/50 transition-colors">
                                        {isDark ?
                                        <Sun size={20} /> :
                                        <Moon size={20} />}
                                    </button>
                                </div>

                                <button onClick={()=> setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2">
                                    {isMenuOpen ?
                                    <X size={24} /> :
                                    <Menu size={24} />}
                                </button>
                            </div>
                        </div>

                        {isMenuOpen && (
                        <div className={`md:hidden ${isDark ? 'bg-gray-800' : 'bg-white' } border-t ${isDark
                            ? 'border-gray-700' : 'border-gray-200' }`}>
                            <div className="px-4 py-4 space-y-3">
                                <button onClick={()=> scrollToSection('home')} className="block w-full text-left py-2
                                    hover:text-teal-500">Home</button>
                                <button onClick={()=> scrollToSection('projects')} className="block w-full text-left
                                    py-2 hover:text-teal-500">Projects</button>
                                <button onClick={()=> scrollToSection('reviews')} className="block w-full text-left py-2
                                    hover:text-teal-500">Reviews</button>
                                <button onClick={()=> scrollToSection('contact')} className="block w-full text-left py-2
                                    hover:text-teal-500">Contact Me</button>
                                <button
                                    className="w-full bg-teal-500 text-white px-6 py-2 rounded-lg hover:bg-teal-600 transition-colors font-semibold">
                                    HIRE ME
                                </button>
                                <button onClick={()=> setIsDark(!isDark)} className="flex items-center space-x-2 py-2">
                                    {isDark ?
                                    <Sun size={20} /> :
                                    <Moon size={20} />}
                                    <span>Toggle Theme</span>
                                </button>
                            </div>
                        </div>
                        )}
                    </nav>

                    {/* Hero Section */}
                    <section id="home" className="relative min-h-screen flex items-center justify-center pt-16">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
                            <div className="grid md:grid-cols-2 gap-12 items-center">
                                <div className="space-y-6">
                                    <div className="inline-block">
                                        <span
                                            className="text-teal-500 font-semibold text-sm tracking-wider uppercase">AI
                                            Automation Specialist</span>
                                    </div>
                                    <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                                        Transform Your Business with
                                        <span className="text-teal-500"> Intelligent Automation</span>
                                    </h1>
                                    <p className={`text-xl ${isDark ? 'text-gray-400' : 'text-gray-600' }`}>
                                        Expert in n8n, LangChain, API Integration, and Zoho CRM automation. I help
                                        businesses save time, reduce costs, and scale efficiently through cutting-edge
                                        AI solutions.
                                    </p>
                                    <div className="flex flex-wrap gap-3">
                                        <span className={`px-4 py-2 rounded-full text-sm font-medium ${isDark
                                            ? 'bg-gray-800' : 'bg-white' } border ${isDark ? 'border-gray-700'
                                            : 'border-gray-200' }`}>n8n Expert</span>
                                        <span className={`px-4 py-2 rounded-full text-sm font-medium ${isDark
                                            ? 'bg-gray-800' : 'bg-white' } border ${isDark ? 'border-gray-700'
                                            : 'border-gray-200' }`}>LangChain</span>
                                        <span className={`px-4 py-2 rounded-full text-sm font-medium ${isDark
                                            ? 'bg-gray-800' : 'bg-white' } border ${isDark ? 'border-gray-700'
                                            : 'border-gray-200' }`}>API Integration</span>
                                        <span className={`px-4 py-2 rounded-full text-sm font-medium ${isDark
                                            ? 'bg-gray-800' : 'bg-white' } border ${isDark ? 'border-gray-700'
                                            : 'border-gray-200' }`}>Zoho CRM</span>
                                    </div>
                                    <button
                                        className="bg-teal-500 text-white px-8 py-4 rounded-lg hover:bg-teal-600 transition-all transform hover:scale-105 font-semibold text-lg inline-flex items-center space-x-2 shadow-lg">
                                        <Calendar size={20} />
                                        <span>Book a Discovery Call</span>
                                    </button>
                                </div>
                                <div className="flex justify-center">
                                    <div className="relative">
                                        <div
                                            className="w-72 h-72 md:w-96 md:h-96 rounded-full overflow-hidden border-4 border-teal-500 shadow-2xl">
                                            <div className={`w-full h-full flex items-center justify-center text-6xl
                                                font-bold ${isDark ? 'bg-gray-800' : 'bg-gray-200' }`}>
                                                GK
                                            </div>
                                        </div>
                                        <div
                                            className="absolute -bottom-4 -right-4 bg-teal-500 text-white px-6 py-3 rounded-lg font-semibold shadow-xl">
                                            Available for Hire
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Projects Section */}
                    <section id="projects" className="relative py-20">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                            <div className="text-center mb-16">
                                <h2 className="text-4xl md:text-5xl font-bold mb-4">Featured Projects</h2>
                                <p className={`text-xl ${isDark ? 'text-gray-400' : 'text-gray-600' }`}>Real-world
                                    automation solutions delivering measurable results</p>
                            </div>

                            <div className="space-y-8">
                                {projects.map((project, idx) => (
                                <div key={idx} className={`${isDark ? 'bg-gray-800/50' : 'bg-white' } backdrop-blur-sm
                                    rounded-xl p-8 border ${isDark ? 'border-gray-700' : 'border-gray-200' }
                                    hover:border-teal-500 transition-all hover:shadow-xl`}>
                                    <h3 className="text-2xl font-bold mb-4 text-teal-500">{project.title}</h3>

                                    <div className="grid md:grid-cols-3 gap-6 mb-6">
                                        <div>
                                            <h4
                                                className="font-semibold mb-2 text-sm uppercase tracking-wider opacity-70">
                                                Challenge</h4>
                                            <p className={isDark ? 'text-gray-300' : 'text-gray-700' }>
                                                {project.challenge}</p>
                                        </div>
                                        <div>
                                            <h4
                                                className="font-semibold mb-2 text-sm uppercase tracking-wider opacity-70">
                                                Solution</h4>
                                            <p className={isDark ? 'text-gray-300' : 'text-gray-700' }>
                                                {project.solution}</p>
                                        </div>
                                        <div>
                                            <h4
                                                className="font-semibold mb-2 text-sm uppercase tracking-wider opacity-70">
                                                Result</h4>
                                            <p className={isDark ? 'text-gray-300' : 'text-gray-700' }>{project.result}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap gap-4 mb-4">
                                        {project.metrics.map((metric, i) => (
                                        <div key={i}
                                            className="bg-teal-500/10 text-teal-500 px-4 py-2 rounded-lg font-semibold">
                                            {metric}
                                        </div>
                                        ))}
                                    </div>

                                    <div className="flex flex-wrap gap-2">
                                        {project.tech.map((tech, i) => (
                                        <span key={i} className={`px-3 py-1 rounded-full text-xs font-medium ${isDark
                                            ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700' }`}>
                                            {tech}
                                        </span>
                                        ))}
                                    </div>
                                </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Reviews Section */}
                    <section id="reviews" className="relative py-20">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                            <div className="text-center mb-16">
                                <h2 className="text-4xl md:text-5xl font-bold mb-4">Client Testimonials</h2>
                                <p className={`text-xl ${isDark ? 'text-gray-400' : 'text-gray-600' }`}>What clients say
                                    about working with me</p>
                            </div>

                            <div className="grid md:grid-cols-3 gap-8">
                                {reviews.map((review, idx) => (
                                <div key={idx} className={`${isDark ? 'bg-gray-800/50' : 'bg-white' } backdrop-blur-sm
                                    rounded-xl p-6 border ${isDark ? 'border-gray-700' : 'border-gray-200' }
                                    hover:border-teal-500 transition-all`}>
                                    <div className="flex mb-4">
                                        {[...Array(review.rating)].map((_, i) => (
                                        <span key={i} className="text-teal-500 text-xl">★</span>
                                        ))}
                                    </div>
                                    <p className={`mb-6 italic ${isDark ? 'text-gray-300' : 'text-gray-700' }`}>
                                        "{review.review}"</p>
                                    <div>
                                        <p className="font-semibold">{review.name}</p>
                                        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600' }`}>
                                            {review.role}</p>
                                    </div>
                                </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Contact Section */}
                    <section id="contact" className="relative py-20">
                        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                            <div className={`${isDark ? 'bg-gray-800/50' : 'bg-white' } backdrop-blur-sm rounded-xl p-12
                                border ${isDark ? 'border-gray-700' : 'border-gray-200' } text-center`}>
                                <h2 className="text-4xl md:text-5xl font-bold mb-6">Let's Build Something Amazing</h2>
                                <p className={`text-xl mb-8 ${isDark ? 'text-gray-400' : 'text-gray-600' }`}>
                                    Ready to automate your business and unlock new levels of efficiency? Let's discuss
                                    your project.
                                </p>

                                <div className="flex flex-wrap justify-center gap-4 mb-8">
                                    <a href="mailto:contact@golamkibrya.com" className={`flex items-center space-x-2
                                        px-6 py-3 rounded-lg ${isDark ? 'bg-gray-700 hover:bg-gray-600'
                                        : 'bg-gray-100 hover:bg-gray-200' } transition-colors`}>
                                        <Mail size={20} />
                                        <span>Email Me</span>
                                    </a>
                                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
                                        className={`flex items-center space-x-2 px-6 py-3 rounded-lg ${isDark
                                        ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200' }
                                        transition-colors`}>
                                        <Linkedin size={20} />
                                        <span>LinkedIn</span>
                                    </a>
                                    <a href="https://github.com" target="_blank" rel="noopener noreferrer"
                                        className={`flex items-center space-x-2 px-6 py-3 rounded-lg ${isDark
                                        ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200' }
                                        transition-colors`}>
                                        <Github size={20} />
                                        <span>GitHub</span>
                                    </a>
                                </div>

                                <button
                                    className="bg-teal-500 text-white px-10 py-4 rounded-lg hover:bg-teal-600 transition-all transform hover:scale-105 font-semibold text-lg shadow-lg">
                                    Schedule a Free Consultation
                                </button>
                            </div>
                        </div>
                    </section>

                    {/* Footer */}
                    <footer className={`relative border-t ${isDark ? 'border-gray-800' : 'border-gray-200' } py-8`}>
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                            <div className="text-center">
                                <p className={isDark ? 'text-gray-400' : 'text-gray-600' }>
                                    © 2024 Golam Kibrya. All rights reserved. Built with React & Tailwind CSS.
                                </p>
                            </div>
                        </div>
                    </footer>
                </div>
                );
                };

                export default Portfolio;