import React, { useState } from 'react';
import './FinalSelection.css';
import { venues } from './VenueData';

const FinalSelectionModal = ({ onClose, onConfirm }) => {
    const [selectedId, setSelectedId] = useState(null);

    const handleConfirm = () => {
        if (selectedId) {
            const winner = venues.find(v => v.id === selectedId);
            onConfirm(winner);
        }
    };

    return (
        <div className="final-selection-overlay" onClick={onClose}>
            <div className="final-selection-card" onClick={e => e.stopPropagation()}>
                <button className="close-modal-btn" onClick={onClose}>×</button>

                <div className="final-selection-header">
                    <h2>Pilih Pemenang Bukber</h2>
                    <p>Tentukan satu tempat terbaik pilihan jemaah!</p>
                </div>

                <div className="venue-checklist">
                    {venues.map((venue) => (
                        <div
                            key={venue.id}
                            className={`checklist-item ${selectedId === venue.id ? 'selected' : ''}`}
                            onClick={() => setSelectedId(venue.id)}
                        >
                            <div className="checklist-radio"></div>
                            <div className="checklist-info">
                                <h4>{venue.name}</h4>
                                <span>{venue.location}</span>
                            </div>
                        </div>
                    ))}
                </div>

                <button
                    className="confirm-btn"
                    disabled={!selectedId}
                    onClick={handleConfirm}
                >
                    Tetapkan Pilihan! 🚀
                </button>
            </div>
        </div>
    );
};

export default FinalSelectionModal;
