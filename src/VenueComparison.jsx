import React from 'react';
import './VenueComparison.css';

const VenueComparison = ({ venue1, venue2, onBack }) => {
    if (!venue1 || !venue2) return null;

    return (
        <div className="comparison-container">
            <button className="detail-back-btn" onClick={onBack}>
                ← Kembali ke Pilihan
            </button>

            <div className="comparison-header">
                <h2>Perbandingan Tempat</h2>
            </div>

            <div className="comparison-grid">
                <div className="vs-badge">VS</div>

                {/* Column 1 */}
                <div className="comparison-column">
                    <div className="compare-card">
                        <h3 className="compare-title">{venue1.name}</h3>
                        <span className="compare-price">{venue1.budgetRange}</span>

                        <div className="compare-section-title">Kenapa Cocok</div>
                        <ul className="compare-list">
                            {venue1.why.map((item, i) => <li key={i}>{item}</li>)}
                        </ul>

                        <div className="compare-section-title" style={{ marginTop: '1.5rem' }}>Budget Hack</div>
                        <ul className="compare-list">
                            {venue1.budgetHack.map((item, i) => <li key={i}>{item}</li>)}
                        </ul>

                        <div className="compare-section-title" style={{ marginTop: '1.5rem' }}>Fasilitas</div>
                        <p style={{ fontSize: '0.95rem' }}>{venue1.facilities}</p>
                    </div>
                </div>

                {/* Column 2 */}
                <div className="comparison-column">
                    <div className="compare-card">
                        <h3 className="compare-title">{venue2.name}</h3>
                        <span className="compare-price">{venue2.budgetRange}</span>

                        <div className="compare-section-title">Kenapa Cocok</div>
                        <ul className="compare-list">
                            {venue2.why.map((item, i) => <li key={i}>{item}</li>)}
                        </ul>

                        <div className="compare-section-title" style={{ marginTop: '1.5rem' }}>Budget Hack</div>
                        <ul className="compare-list">
                            {venue2.budgetHack.map((item, i) => <li key={i}>{item}</li>)}
                        </ul>

                        <div className="compare-section-title" style={{ marginTop: '1.5rem' }}>Fasilitas</div>
                        <p style={{ fontSize: '0.95rem' }}>{venue2.facilities}</p>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default VenueComparison;
