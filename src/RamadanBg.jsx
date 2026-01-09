import React, { useMemo } from 'react';
import './RamadanBg.css';

const RamadanBg = () => {
    // Generate random particles
    const particles = useMemo(() => {
        return Array.from({ length: 20 }).map((_, i) => ({
            left: Math.random() * 100 + '%',
            duration: Math.random() * 10 + 10 + 's',
            delay: Math.random() * 5 + 's',
            size: Math.random() * 3 + 1 + 'px'
        }));
    }, []);

    return (
        <div className="ramadan-bg-container">
            <div className="bg-gradient"></div>
            <div className="bg-pattern"></div>

            {/* Decorative Hanging Lanterns & Stars */}
            <div className="hanging-decoration-container">
                <div className="string string-1"></div>
                <div className="decoration-lantern lantern-1"></div>

                <div className="string string-2"></div>
                <div className="decoration-lantern lantern-2"></div>

                <div className="string string-3"></div>
                <div className="decoration-lantern lantern-3"></div>

                <div className="string string-4"></div>
                <div className="decoration-lantern lantern-4"></div>

                <div className="string string-5"></div>
                <div className="decoration-star star-1">✦</div>
            </div>

            {/* Permanent Moon & Dual Skyline */}
            <div className="bg-moon"></div>
            <div className="bg-mosque-skyline layer-back"></div>
            <div className="bg-mosque-skyline layer-front"></div>

            {/* Vignette & Golden Frame */}
            <div className="bg-vignette"></div>
            <div className="bg-golden-frame"></div>

            {/* Floating Particles */}
            {particles.map((p, i) => (
                <div
                    key={i}
                    className="particle"
                    style={{
                        left: p.left,
                        width: p.size,
                        height: p.size,
                        '--duration': p.duration,
                        animationDelay: p.delay
                    }}
                ></div>
            ))}
        </div>
    );
};

export default RamadanBg;
