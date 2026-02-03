import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, Activity, Zap } from 'lucide-react';

export default function LoadingAnimation({ onComplete }) {
    const [loadingStage, setLoadingStage] = useState(0);
    const [particles, setParticles] = useState([]);

    useEffect(() => {
        // Generate random particles for network effect
        const particleArray = Array.from({ length: 20 }, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            delay: Math.random() * 0.5,
            duration: 2 + Math.random() * 1
        }));
        setParticles(particleArray);

        // Loading stage progression
        const timer1 = setTimeout(() => setLoadingStage(1), 800);
        const timer2 = setTimeout(() => setLoadingStage(2), 1600);
        const timer3 = setTimeout(() => {
            setLoadingStage(3);
            setTimeout(onComplete, 400);
        }, 2400);

        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
            clearTimeout(timer3);
        };
    }, [onComplete]);

    const loadingMessages = [
        'Initializing Neural Engine...',
        'Loading Market Data...',
        'Calibrating AI Models...',
        'Ready'
    ];

    return (
        <AnimatePresence>
            <motion.div
                className="loading-screen"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
            >
                {/* Particle Network Background */}
                <div className="particle-container">
                    {particles.map((particle) => (
                        <motion.div
                            key={particle.id}
                            className="particle"
                            initial={{
                                x: `${particle.x}%`,
                                y: `${particle.y}%`,
                                opacity: 0,
                                scale: 0
                            }}
                            animate={{
                                opacity: [0, 1, 1, 0],
                                scale: [0, 1, 1, 0],
                                x: [`${particle.x}%`, `${particle.x + (Math.random() - 0.5) * 20}%`],
                                y: [`${particle.y}%`, `${particle.y + (Math.random() - 0.5) * 20}%`]
                            }}
                            transition={{
                                duration: particle.duration,
                                delay: particle.delay,
                                repeat: Infinity,
                                repeatType: 'loop'
                            }}
                        />
                    ))}
                </div>

                {/* Logo Container */}
                <motion.div
                    className="logo-animation-container"
                    initial={{ opacity: 0, scale: 0.5, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{
                        duration: 0.8,
                        ease: [0.43, 0.13, 0.23, 0.96]
                    }}
                >
                    {/* Pulsing Glow Ring */}
                    <motion.div
                        className="glow-ring"
                        animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.3, 0.6, 0.3]
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />

                    {/* Logo Icon */}
                    <div className="logo-icon-wrapper">
                        <motion.div
                            animate={{
                                rotate: [0, 360]
                            }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                                ease: "linear"
                            }}
                        >
                            <TrendingUp size={60} strokeWidth={2} />
                        </motion.div>

                        <motion.div
                            className="icon-accent"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.3, duration: 0.5 }}
                        >
                            <Activity size={24} className="accent-icon" />
                        </motion.div>
                    </div>

                    {/* App Name */}
                    <motion.h1
                        className="app-title"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                    >
                        Institutional AI
                    </motion.h1>
                    <motion.p
                        className="app-subtitle"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6, duration: 0.6 }}
                    >
                        Trading Platform
                    </motion.p>
                </motion.div>

                {/* Progress Bar */}
                <motion.div
                    className="progress-container"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                >
                    <motion.div
                        className="progress-bar"
                        initial={{ width: '0%' }}
                        animate={{ width: `${(loadingStage / 3) * 100}%` }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                    />
                </motion.div>

                {/* Loading Text */}
                <motion.div
                    className="loading-text"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 }}
                >
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={loadingStage}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                            className="loading-message"
                        >
                            <Zap size={16} className="loading-icon" />
                            {loadingMessages[loadingStage]}
                        </motion.div>
                    </AnimatePresence>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
