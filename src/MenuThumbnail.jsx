import React, { useState, useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';
import './MenuGallery.css';

// Load all menu images eagerly
const allMenuImages = import.meta.glob('./assets/*/Menu/*.{jpeg,jpg,png}', { eager: true });

const MenuThumbnail = ({ folderName }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showModal, setShowModal] = useState(false);

    // Filter images for this specific venue
    const images = useMemo(() => {
        return Object.keys(allMenuImages)
            .filter(path => path.includes(`/${folderName}/Menu/`)) // Ensure exact subfolder match
            .map(path => allMenuImages[path].default);
    }, [folderName]);

    // Slideshow effect for thumbnail
    useEffect(() => {
        if (images.length <= 1 || showModal) return;

        const interval = setInterval(() => {
            setCurrentIndex(prev => (prev + 1) % images.length);
        }, 2500); // Change every 2.5s

        return () => clearInterval(interval);
    }, [images.length, showModal]);

    if (images.length === 0) {
        return <span style={{ color: '#64748b', fontSize: '0.9rem' }}>No Menu</span>;
    }

    return (
        <>
            <div className="menu-thumbnail-container" onClick={(e) => {
                e.stopPropagation(); // Prevent row click
                setShowModal(true);
            }}>
                <img
                    src={images[currentIndex]}
                    alt="Menu Preview"
                    className="menu-thumb-img"
                />
                <div className="menu-badge">
                    {images.length} Menu Pages
                </div>
            </div>

            {showModal && createPortal(
                <MenuModal
                    images={images}
                    initialIndex={currentIndex}
                    onClose={() => setShowModal(false)}
                />,
                document.body
            )}
        </>
    );
};

const MenuModal = ({ images, initialIndex, onClose }) => {
    const [index, setIndex] = useState(initialIndex);

    const next = (e) => {
        e.stopPropagation();
        setIndex((prev) => (prev + 1) % images.length);
    };

    const prev = (e) => {
        e.stopPropagation();
        setIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    return (
        <div className="menu-modal-overlay" onClick={(e) => {
            e.stopPropagation();
            onClose();
        }}>
            <div className="menu-modal-content" onClick={e => e.stopPropagation()}>
                <button className="menu-close-btn" onClick={onClose}>×</button>

                {images.length > 1 && (
                    <button className="menu-nav-btn nav-prev" onClick={prev}>‹</button>
                )}

                <img
                    src={images[index]}
                    alt={`Menu Page ${index + 1}`}
                    className="menu-full-img"
                />

                {images.length > 1 && (
                    <button className="menu-nav-btn nav-next" onClick={next}>›</button>
                )}

                <div className="menu-counter">
                    Page {index + 1} of {images.length}
                </div>
            </div>
        </div>
    );
};

export default MenuThumbnail;
