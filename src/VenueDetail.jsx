import React, { useState, useMemo } from 'react';
import './VenueDetail.css';

// Eagerly load all images from assets
// Returns an object like: { './assets/Kampung Kecil/1.jpeg': { default: "url..." }, ... }
const allImages = import.meta.glob('./assets/*/*.{jpeg,jpg,png}', { eager: true });

const VenueDetail = ({ venue, onBack }) => {
    const [selectedImage, setSelectedImage] = useState(null);

    if (!venue) return null;

    // Filter images for the current venue based on folderName
    const venueImages = useMemo(() => {
        return Object.keys(allImages)
            .filter(path => path.includes(`/${venue.folderName}/`))
            .map(path => allImages[path].default);
    }, [venue.folderName]);

    return (
        <div className="detail-container">
            {/* Top Navigation */}
            <button className="detail-back-btn" onClick={onBack}>
                ← Kembali ke Pilihan
            </button>

            <div className="detail-header">
                <h2>{venue.name}</h2>
                <span className="detail-location">📍 {venue.location}</span>
            </div>

            {venueImages.length > 0 ? (
                <div className="detail-gallery">
                    {venueImages.map((imgSrc, index) => (
                        <img
                            key={index}
                            src={imgSrc}
                            alt={`${venue.name} preview ${index + 1}`}
                            className="gallery-item"
                            onClick={() => setSelectedImage(imgSrc)}
                        />
                    ))}
                </div>
            ) : (
                <div style={{ textAlign: 'center', marginBottom: '2rem', color: '#888' }}>
                    <p>No preview images available.</p>
                </div>
            )}

            {/* Lightbox Modal */}
            {selectedImage && (
                <div className="lightbox-overlay" onClick={() => setSelectedImage(null)}>
                    <div className="lightbox-content">
                        <img src={selectedImage} alt="Full preview" />
                        <button className="lightbox-close" onClick={() => setSelectedImage(null)}>×</button>
                    </div>
                </div>
            )}

            <div className="detail-info">
                <div className="info-card">
                    <h3>🧠 Kenapa Cocok (Fisiologis)</h3>
                    <ul className="info-list">
                        {venue.why.map((item, i) => <li key={i}>{item}</li>)}
                    </ul>
                </div>

                <div className="info-card budget-section">
                    <h3>💸 Budget Hack ({venue.budgetRange})</h3>
                    <ul className="info-list">
                        {venue.budgetHack.map((item, i) => <li key={i}>{item}</li>)}
                    </ul>
                </div>

                <div className="info-card full-width facility-section">
                    <h3>🕌 Fasilitas & Kapasitas</h3>
                    <p>{venue.facilities}</p>
                </div>
            </div>
        </div>
    );
};

export default VenueDetail;
