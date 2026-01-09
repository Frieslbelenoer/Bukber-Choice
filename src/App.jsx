import { useState, useEffect } from 'react'
import './App.css'
import LoadingScreen from './LoadingScreen'
import VenueTable from './VenueTable'
import VenueDetail from './VenueDetail'
import VenueComparison from './VenueComparison'
import { venues } from './VenueData'
import RamadanBg from './RamadanBg'
import FinalSelectionModal from './FinalSelectionModal'
import WinnerCelebration from './WinnerCelebration'

function App() {
  const [showTable, setShowTable] = useState(false)
  const [selectedVenue, setSelectedVenue] = useState(null)
  const [comparisonIds, setComparisonIds] = useState([])
  const [showComparison, setShowComparison] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const [showFinalModal, setShowFinalModal] = useState(false)
  const [finalWinner, setFinalWinner] = useState(null)

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  // Handle back logic
  const handleBack = () => {
    if (finalWinner) {
      setFinalWinner(null) // Reset winner goes back to table
    } else if (selectedVenue) {
      setSelectedVenue(null)
    } else if (showComparison) {
      setShowComparison(false)
    } else {
      setShowTable(false)
      setComparisonIds([]) // Reset comparison when leaving table
    }
  }

  // Toggle selection for comparison
  const handleToggleSelection = (id) => {
    setComparisonIds(prev => {
      if (prev.includes(id)) {
        return prev.filter(item => item !== id);
      } else {
        if (prev.length < 2) {
          return [...prev, id];
        }
        return prev;
      }
    });
  }

  const handleFinalConfirm = (winner) => {
    setFinalWinner(winner);
    setShowFinalModal(false);
  }

  if (isLoading) return <LoadingScreen />

  return (
    <>
      <RamadanBg />

      {showTable ? (
        <div className="table-page-container">
          {/* 0. Winner View Overlay (Global over table) */}
          {finalWinner ? (
            <WinnerCelebration
              venue={finalWinner}
              onReset={() => setFinalWinner(null)}
            />
          ) : selectedVenue ? (
            /* 1. Detail View */
            <VenueDetail venue={selectedVenue} onBack={() => setSelectedVenue(null)} />
          ) : showComparison ? (
            /* 2. Comparison View */
            <VenueComparison
              venue1={venues.find(v => v.id === comparisonIds[0])}
              venue2={venues.find(v => v.id === comparisonIds[1])}
              onBack={() => setShowComparison(false)}
            />
          ) : (
            /* 3. Table View */
            <>
              {showFinalModal && (
                <FinalSelectionModal
                  onClose={() => setShowFinalModal(false)}
                  onConfirm={handleFinalConfirm}
                />
              )}

              <VenueTable
                onSelectVenue={setSelectedVenue}
                selectedIds={comparisonIds}
                onToggleSelection={handleToggleSelection}
              />

              {/* Final Selection Trigger Section */}
              <div className="final-decision-section">
                <h3 className="final-decision-title">Udah nentuin pilihannya?</h3>
                <button className="final-decision-btn" onClick={() => setShowFinalModal(true)}>
                  ✅ Pilih Tempat Final
                </button>
              </div>

              {/* Floating Comparison Bar */}
              {comparisonIds.length > 0 && (
                <div className="comparison-fab-container">
                  <div className="comparison-status">
                    {comparisonIds.length} terpilih
                  </div>
                  <button
                    className="comparison-go-btn"
                    disabled={comparisonIds.length < 2}
                    onClick={() => setShowComparison(true)}
                  >
                    Bandingkan {comparisonIds.length}/2
                  </button>
                </div>
              )}

              <button className="back-button" onClick={handleBack}>
                ← Kembali
              </button>
            </>
          )}
        </div>
      ) : (
        /* Home View */
        <div className="app-container">
          <main className="hero">
            <h1>Bukber Choice</h1>
            <p>
              Atur acara buka puasa bersama dengan mudah.
              Voting tempat, atur jadwal, dan ciptakan momen kebersamaan yang tak terlupakan.
            </p>

            <button className="cta-button" onClick={() => setShowTable(true)}>
              Mulai Sekarang
            </button>
          </main>
        </div>
      )}
    </>
  )
}

export default App
