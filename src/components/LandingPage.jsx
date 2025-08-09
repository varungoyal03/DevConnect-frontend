import React from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { useNavigate } from 'react-router';
// --- Helper Components & Icons ---

const CodeBracketIcon = () => (
<svg className="w-8 h-8 text-sky-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
<path strokeLinecap="round" strokeLinejoin="round" d="M14.25 9.75L16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
</svg>
);

// --- Reusable UI Components (Inspired by shadcn/ui) ---




const Button = ({ children, to, variant = 'default', className = '', ...props }) => {
  const navigate = useNavigate();
  const baseClasses = "inline-block font-semibold px-6 py-2.5 rounded-md transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-sky-500/30 text-sm";
  const variants = {
    default: "bg-white text-black hover:bg-slate-200",
    outline: "bg-transparent border border-slate-800 text-slate-300 hover:bg-slate-900 hover:border-slate-700"
  };

  return (
    <button
      onClick={() => to && navigate(to)}
      className={`${baseClasses} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};


const Card = ({ children, className = '' }) => (
<motion.div
className={`bg-slate-950/50 p-8 rounded-xl border border-slate-800/50 transition-colors duration-300 ${className}`}
whileHover={{ borderColor: 'rgba(56, 189, 248, 0.3)' }}
>
{children}
</motion.div>
);

// --- Animation Variants ---

const fadeIn = (delay = 0) => ({
hidden: { opacity: 0, y: 20 },
visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut", delay } }
});

// --- Main Page Components ---

const Header = () => (
<motion.header
initial={{ y: -100 }}
animate={{ y: 0 }}
transition={{ duration: 0.5, ease: "easeOut" }}
className="fixed top-0 left-0 right-0 z-50 bg-black/60 backdrop-blur-lg"
>
<div className="container mx-auto px-6 py-4 flex justify-between items-center border-b border-slate-800/50">
<div className="flex items-center space-x-3">
<CodeBracketIcon />
<h1 className="text-2xl font-bold text-white">DevConnect</h1>
</div>
<nav className="hidden md:flex items-center space-x-8 text-sm">
<a href="#features" className="text-slate-400 hover:text-white transition">Features</a>
<a href="#how-it-works" className="text-slate-400 hover:text-white transition">How It Works</a>
<a href="#testimonials" className="text-slate-400 hover:text-white transition">Testimonials</a>
</nav>
<div className="flex items-center space-x-4">
  <Button to="/login" variant="outline" className="hidden sm:block text-sm">
    Log In
  </Button>
  <Button to="/signup" variant="default">
    Get Started
  </Button>
</div>
</div>
</motion.header>
);


const Hero = () => (
  <main className="pt-40 pb-24 relative overflow-hidden">
    {/* Background gradient */}
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(56,189,248,0.08),rgba(255,255,255,0))]"></div>

    <motion.div
      className="container mx-auto px-6 text-center relative z-10"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: 0.15 },
        },
      }}
    >
      {/* Heading Top Text */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-sky-400 font-semibold"
      >
        Meet DevConnect
      </motion.p>

      {/* Main Heading */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="text-4xl md:text-6xl font-bold text-white leading-tight tracking-tighter mt-4"
      >
        Your Professional <span className="text-sky-400">Network</span>
      </motion.h1>

      {/* Subtext */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mt-6 text-lg text-slate-400 max-w-2xl mx-auto"
      >
        A community designed for developers to connect, collaborate, and grow their careers in a secure, real-time environment.
      </motion.p>

      {/* Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mt-10 flex justify-center items-center space-x-4"
      >
        <Button to="/login">Start Connecting</Button>
  <Button to="/signup" variant="outline">Learn More</Button>
      </motion.div>

      {/* Image */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
        className="mt-16 px-4"
      >
        <div className="relative mx-auto w-1/2 max-w-4xl h-[260px] shadow-2xl shadow-sky-900/20 rounded-2xl">
          <div className="rounded-lg overflow-hidden w-full h-full">
            <img
              src="/unnamed.png"
              alt="DevConnect Network Visualization"
              className="w-full h-full object-contain"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://placehold.co/1200x675/000000/FFFFFF?text=Network+Visualization';
              }}
            />
          </div>
        </div>
      </motion.div>
    </motion.div>
  </main>
);

const Section = ({ children, id }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.3 });

    return (
        <section id={id} ref={ref} className="py-24">
            <motion.div
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
                className="container mx-auto px-6"
            >
                {children}
            </motion.div>
        </section>
    );
};

const Features = () => {
    const features = [
        { title: "Intelligent Feed", description: "Discover relevant developers with a curated feed that filters out existing connections and suggests new peers based on your skills." },
        { title: "Real-Time Chat", description: "Engage in private, real-time conversations with your connections, complete with live typing indicators powered by WebSockets." },
        { title: "Secure Connections", description: "Built with security at its core, featuring JWT authentication, secure cookies, and a robust connection request system." },
    ];

    return (
        <Section id="features">
            <div className="text-center mb-16">
                <motion.h2 variants={fadeIn()} className="text-3xl md:text-4xl font-bold text-white">Why DevConnect?</motion.h2>
                <motion.p variants={fadeIn(0.1)} className="mt-3 text-slate-400 max-w-2xl mx-auto">Everything you need to build a powerful professional network in one place.</motion.p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
                {features.map((feature, index) => (
                    <motion.div variants={fadeIn(0.2 + index * 0.1)} key={index}>
                        <Card>
                            <h3 className="text-xl font-semibold text-white">{feature.title}</h3>
                            <p className="mt-3 text-slate-400">{feature.description}</p>
                        </Card>
                    </motion.div>
                ))}
            </div>
        </Section>
    );
};

const HowItWorks = () => {
    const steps = [
        {
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 20.118a7.5 7.5 0 0115 0A17.93 17.93 0 0112 21.75c-2.675 0-5.215-.584-7.5-1.632z" />
                </svg>
            ),
            title: "Create Your Profile",
            description: "Sign up and build a rich profile showcasing your skills, projects, and experience.",
        },
        {
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72M9.06 12.559a3.752 3.752 0 01-4.498 2.073 3 3 0 00-4.682-2.72m7.5-2.962V7.5a3 3 0 016 0v3.75M9 12.75h3.75a3 3 0 013 3v3.75a3 3 0 01-3 3H9.75M12 9V7.5a3 3 0 00-3-3H7.5a3 3 0 00-3 3v3.75" />
                </svg>
            ),
            title: "Discover & Connect",
            description: "Browse your personalized feed and send connection requests to interesting developers.",
        },
        {
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 100 15 7.5 7.5 0 000-15z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z" />
                </svg>
            ),
            title: "Collaborate & Grow",
            description: "Engage with your new connections through real-time chat and grow your professional network.",
        },
    ];

    return (
        <Section id="how-it-works">
            <div className="text-center mb-16">
                <motion.h2
                    variants={fadeIn()}
                    className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-sky-400 to-blue-600 bg-clip-text text-transparent"
                >
                    Get Started in Minutes
                </motion.h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
                {steps.map((step, index) => (
                    <motion.div
                        key={index}
                        variants={fadeIn(0.2 + index * 0.15)}
                        className="group relative bg-slate-950/60 backdrop-blur-md border border-slate-800 rounded-2xl p-8 overflow-hidden transition-transform hover:-translate-y-1 hover:shadow-2xl duration-300"
                    >
                        <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-br from-sky-500/20 via-transparent to-purple-500/20 opacity-30 group-hover:opacity-50 pointer-events-none"></div>
                        <div className="relative z-10 flex flex-col items-center text-center space-y-4">
                            <div className="flex items-center justify-center h-16 w-16 rounded-xl bg-slate-900 border border-slate-700 text-sky-400 shadow-md">
                                {step.icon}
                            </div>
                            <h3 className="text-2xl font-semibold text-white">{step.title}</h3>
                            <p className="text-slate-400 text-sm leading-relaxed">{step.description}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </Section>
    );
};

const Testimonials = () => {
    const testimonials = [
        { name: "Sarah L.", role: "Frontend Developer", quote: "DevConnect is the first platform where I feel like I'm building meaningful professional relationships, not just collecting contacts.", avatar: "https://i.pravatar.cc/48?u=1" },
        { name: "Mike R.", role: "Backend Engineer", quote: "The real-time chat and live status updates make it so easy to collaborate with my connections. It's a game-changer.", avatar: "https://i.pravatar.cc/48?u=2" },
    ];

    return (
        <Section id="testimonials">
            <div className="text-center mb-16">
                <motion.h2 variants={fadeIn()} className="text-3xl md:text-4xl font-bold text-white">What Developers Are Saying</motion.h2>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
                {testimonials.map((testimonial, index) => (
                    <motion.div variants={fadeIn(0.1 + index * 0.1)} key={index}>
                        <Card>
                            <p className="text-slate-300">"{testimonial.quote}"</p>
                            <div className="mt-4 flex items-center">
                                <img className="w-12 h-12 rounded-full" src={testimonial.avatar} alt={testimonial.name} />
                                <div className="ml-4">
                                    <p className="font-semibold text-white">{testimonial.name}</p>
                                    <p className="text-sm text-slate-400">{testimonial.role}</p>
                                </div>
                            </div>
                        </Card>
                    </motion.div>
                ))}
            </div>
        </Section>
    );
};

const CTA = () => (
    <Section id="cta">
        <div className="bg-slate-900/50 border border-slate-800/50 rounded-2xl p-12 text-center">
            <motion.h2 variants={fadeIn()} className="text-3xl font-bold text-white">Ready to Join the Community?</motion.h2>
            <motion.p variants={fadeIn(0.1)} className="mt-4 text-lg text-slate-400 max-w-xl mx-auto">Create your profile today and start connecting with thousands of developers from around the world.</motion.p>
            <motion.div variants={fadeIn(0.2)} className="mt-8">
                <Button to="/signup" className="text-lg px-8 py-3">Sign Up for Free</Button>
            </motion.div>
        </div>
    </Section>
);

const Footer = () => (
    <footer className="bg-black border-t border-slate-800/50">
        <div className="container mx-auto px-6 py-8 text-center text-slate-500 text-sm">
            <p>© {new Date().getFullYear()} DevConnect. All rights reserved.</p>
        </div>
    </footer>
);

// Main App Component
export default function LandingPage() {
    return (
        <div className="bg-black text-slate-200 font-sans antialiased">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.02]"></div>
            <div className="relative z-10">
                <Header />
                <Hero />
                <Features />
                <HowItWorks />
                <Testimonials />
                <CTA />
                <Footer />
            </div>
        </div>
    );
}
