import React, { useEffect } from 'react';
import './FinalSelection.css';
import confetti from 'canvas-confetti';

const WinnerCelebration = ({ venue, onReset }) => {
    useEffect(() => {
        // Launch confetti
        const duration = 3000;
        const end = Date.now() + duration;

        (function frame() {
            confetti({
                particleCount: 5,
                angle: 60,
                spread: 55,
                origin: { x: 0 },
                colors: ['#f59e0b', '#8b5cf6']
            });
            confetti({
                particleCount: 5,
                angle: 120,
                spread: 55,
                origin: { x: 1 },
                colors: ['#f59e0b', '#8b5cf6']
            });

            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        }());
    }, []);

    return (
        <div className="final-selection-overlay">
            <div className="final-selection-card winner-container">
                <div className="winner-trophy">🏆</div>
                <p style={{ color: '#94a3b8', marginBottom: '0.5rem' }}>Keputusan Telah Bulat!</p>
                <h2 className="winner-name">{venue.name}</h2>
                <p style={{ marginBottom: '2rem' }}>Lokasi: {venue.location}</p>

                <div style={{ background: 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '12px', marginBottom: '2rem' }}>
                    <p style={{ fontSize: '0.9rem', color: '#f59e0b' }}>
                        "Selamat menunaikan ibadah puasa dan selamat berbuka bersama!"
                    </p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <button
                        className="confirm-btn"
                        style={{ background: '#25D366' }} // WhatsApp Green
                        onClick={() => {
                            const text = `Halo, kami sudah memutuskan! Pilihan tempat bukber kami adalah: *${venue.name}* (${venue.location}). Terima kasih!`;
                            const url = `https://wa.me/6283879422758?text=${encodeURIComponent(text)}`;
                            window.open(url, '_blank');
                            onReset();
                        }}
                    >
                        📱 Kirim Pilihan ke WhatsApp Group/Admin
                    </button>

                    <button className="confirm-btn" style={{ background: 'rgba(255,255,255,0.1)' }} onClick={onReset}>
                        Pilih Ulang
                    </button>
                </div>
            </div>
        </div>
    );
};

export default WinnerCelebration;
