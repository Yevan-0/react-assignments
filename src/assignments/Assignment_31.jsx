import { useEffect, useState } from 'react'
import './Assignment_31.css'

export default function Assignment_31() {
  const [listing, setListing] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(1);
  const [bg, setBg] = useState();
  const [present, setPresent] = useState(false);

  useEffect(() => {
    setListing([
      { id: currentSlide, bg: "#3366cc", animation: 'Instant' }
    ]);
  }, []);

  useEffect(() => {
    setBg([
      '#3366cc', '#cc0044', '#2d8659', '#db5e0a', '#8a00e6'
    ]);
  }, []);

  const current = listing.find(s => s.id === currentSlide);

  const handleCreateSlide = () => {
    const newId = listing.length > 0 ? Math.max(...listing.map(slide => slide.id)) + 1 : 1;
    const newSlide = {
      id: newId,
      bg: "#3366cc",
      animation: 'Instant'
    }
    setListing(prev => [...prev, newSlide]);
    setCurrentSlide(newId);
  };

  const handleDeleteSlide = () => {
    if (listing.length <= 1) return;

    const updatedListing = listing.filter(slide => slide.id !== current.id);
    const prevSilde = updatedListing[updatedListing.length - 1];

    setListing(updatedListing);
    setCurrentSlide(prevSilde.id);
  };

  const handlePresent = () => {
    if (listing.length > 0) {
      setCurrentSlide(listing[0].id);
    }
    setPresent(true);
  }

  return (
    <div>
      {
        present ? (
          <PresentPage
            currentSlide={currentSlide}
            setCurrentSlide={setCurrentSlide}
            listing={listing}
            setPresent={setPresent}
            bg={bg}
            setBg={setBg}
          />
        ) : (
          <div className="container">

            <div className="editor">

              <div className="listing">
                {listing.map(slide => (
                  <div key={slide.id}
                    className={`listing-item ${slide.id === currentSlide ? 'active' : ''}`}
                    onClick={() => setCurrentSlide(slide.id)}
                    style={{ backgroundColor: slide.bg }}
                  >{slide.text?.slice(0, 1) || ""}</div>
                ))}
                <div className='listing-item add'
                  onClick={handleCreateSlide}>
                </div>
              </div>

              <div className="slide"
                style={{ backgroundColor: current?.bg || "#222" }}>

                <div className="delete"
                  onClick={handleDeleteSlide} />

                <div className="play"
                  onClick={handlePresent}
                />

                <input
                  type="text"
                  spellCheck="false"
                  value={current?.text || ""}
                  onChange={e => {
                    const updated = listing.map(s =>
                      s.id === currentSlide ? { ...s, text: e.target.value } : s
                    );
                    setListing(updated);
                  }}
                  style={{
                    backgroundColor: "transparent",
                    border: "none",
                    outline: 'none',
                    textAlign: 'center',
                    fontSize: '36px'
                  }}
                />

                <div className="backgrounds">
                  {bg?.map(color => (
                    <div
                      key={color}
                      className="background-item"
                      style={{
                        backgroundColor: color,
                        border: current?.bg === color ? "2px solid #fff" : "1px solid transparent",
                      }}
                      onClick={() => {
                        const updated = listing.map(s =>
                          s.id === currentSlide ? { ...s, bg: color } : s
                        );
                        setListing(updated);
                      }}
                    ></div>
                  ))}
                </div>

                <div className="animations">
                  {['Instant', 'Fade', 'Blur', 'Up', 'Down', 'Rotate'].map(animate => (
                    <div
                      key={animate}
                      className="animation-item"
                      style={{
                        border: current?.animation === animate ? '2px solid #fff' : '1px solid transparent'
                      }}
                      onClick={() => {
                        const updated = listing.map(s =>
                          s.id === currentSlide ? { ...s, animation: animate } : s
                        );
                        setListing(updated);
                      }}
                    >
                      {animate}
                    </div>
                  ))}

                </div>

              </div>

            </div >

          </div >

        )
      }
    </div >
  )
}

function PresentPage({ currentSlide, setCurrentSlide, listing, setPresent }) {
  const current = listing.find(s => s.id === currentSlide);

  const handleExit = () => {
    setPresent(false);
  }

  const handleNext = () => {
    const index = listing.findIndex(s => s.id === currentSlide);
    if (index < listing.length - 1) {
      setCurrentSlide(listing[index + 1].id);
    }
  };

  const handlePrev = () => {
    const index = listing.findIndex(s => s.id === currentSlide);
    if (index > 0) {
      setCurrentSlide(listing[index - 1].id);
    }
  };

  return (
    <div>
      <div className="show" >
        <div
          className={`show-slide-idle ${current?.animation?.toLowerCase()}`}
          style={{ backgroundColor: current?.bg }} >

          <div
            className="exit"
            onClick={handleExit}
          />

          <div
            className="slide-text">
            {current?.text || ""}
          </div>

          <div className="next"
            onClick={handleNext} />

          <div className="prev"
            onClick={handlePrev} />
        </div>
      </div>
    </div>
  )
}