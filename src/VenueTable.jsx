import React from 'react';
import './VenueTable.css';
import { venues } from './VenueData'; // Import data
import MenuThumbnail from './MenuThumbnail';

const VenueTable = ({ onSelectVenue, selectedIds = [], onToggleSelection }) => {
    return (
        <div className="table-container">
            <div className="table-header">
                <h2>Rekomendasi Bukber</h2>
                <p style={{ color: 'var(--color-text-muted)', marginTop: '0.5rem' }}>
                    Klik baris untuk detail • Pilih box untuk bandingkan (Maks 2)
                </p>
                <div className="table-divider"></div>
            </div>

            <table className="custom-table">
                <thead>
                    <tr>
                        <th style={{ width: '50px' }}>Vs</th>
                        <th>Tempat</th>
                        <th>Menu</th>
                        <th>Kenapa Cocok (Fisiologis)</th>
                        <th>Budget Hack & Tips</th>
                        <th>Fasilitas</th>
                    </tr>
                </thead>
                <tbody>
                    {venues.map((venue, index) => {
                        const isSelected = selectedIds.includes(venue.id);
                        const isDisabled = selectedIds.length >= 2 && !isSelected;

                        return (
                            <tr
                                key={index}
                                onClick={() => onSelectVenue(venue)}
                                style={{ cursor: 'pointer' }}
                                className={isSelected ? 'row-selected' : ''}
                            >
                                <td className="selection-cell" onClick={(e) => e.stopPropagation()}>
                                    <label className="checkbox-wrapper">
                                        <input
                                            type="checkbox"
                                            checked={isSelected}
                                            disabled={isDisabled}
                                            onChange={() => onToggleSelection(venue.id)}
                                        />
                                        <span className="checkmark"></span>
                                    </label>
                                </td>
                                <td data-label="Tempat" className="name-cell">
                                    <h3>{venue.name}</h3>
                                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                                        <span className="location-badge">{venue.location}</span>
                                        {venue.mapsUrl && (
                                            <a
                                                href={venue.mapsUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="maps-link"
                                                onClick={(e) => e.stopPropagation()}
                                            >
                                                🗺️ Maps
                                            </a>
                                        )}
                                    </div>
                                    <div className="click-hint">👆 Klik untuk detail</div>
                                </td>
                                <td>
                                    <MenuThumbnail folderName={venue.folderName} />
                                </td>
                                <td data-label="Kenapa Cocok" className="why-cell">
                                    <ul className="why-list">
                                        {venue.why.map((item, i) => <li key={i}>{item}</li>)}
                                    </ul>
                                </td>
                                <td data-label="Budget Hack" className="budget-cell">
                                    <span className="budget-price">{venue.budgetRange}</span>
                                    <ul className="budget-list">
                                        {venue.budgetHack.map((item, i) => <li key={i}>{item}</li>)}
                                    </ul>
                                </td>
                                <td data-label="Fasilitas" className="facility-cell">
                                    {venue.facilities}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default VenueTable;
