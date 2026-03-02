import { useEffect } from 'react'

export default function RestaurantModal({ restaurant, onClose }) {
  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  const r = restaurant

  const tasteColors = {
    '단맛': '#f06292', '짠맛': '#78909c', '신맛': '#aed6f1',
    '쓴맛': '#8d6e63', '매운맛': '#ef5350'
  }
  const textureColors = {
    '바삭한': '#ffb74d', '쫄깃한': '#66bb6a',
    '찐득한': '#ffd54f', '부드러운': '#ce93d8'
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>

        {/* Hero Section */}
        <div className="modal-hero">
          <div className="modal-emoji">{r.image}</div>
          <div className="modal-hero-info">
            <div className="modal-cuisines">
              {r.cuisine.map(c => (
                <span key={c} className="modal-cuisine-badge">{c}</span>
              ))}
            </div>
            <h2 className="modal-name">{r.name}</h2>
            <p className="modal-district">📍 {r.district} · {r.distance}km</p>
          </div>
        </div>

        <div className="modal-body">
          {/* Description */}
          <div className="modal-section">
            <p className="modal-description">{r.description}</p>
          </div>

          {/* Info Grid */}
          <div className="modal-info-grid">
            <div className="info-item">
              <span className="info-icon">🏠</span>
              <div>
                <div className="info-label">주소</div>
                <div className="info-value">{r.address}</div>
              </div>
            </div>
            {r.phone && (
              <div className="info-item">
                <span className="info-icon">📞</span>
                <div>
                  <div className="info-label">전화번호</div>
                  <div className="info-value">{r.phone}</div>
                </div>
              </div>
            )}
            <div className="info-item">
              <span className="info-icon">🕐</span>
              <div>
                <div className="info-label">영업시간</div>
                <div className="info-value">{r.hours}</div>
              </div>
            </div>
            <div className="info-item">
              <span className="info-icon">💰</span>
              <div>
                <div className="info-label">가격대</div>
                <div className="info-value price">{r.priceRange}</div>
              </div>
            </div>
          </div>

          {/* Representative Menu */}
          <div className="modal-section">
            <h4 className="section-title">🍽️ 대표 메뉴</h4>
            <div className="menu-list">
              {r.representativeMenu.map((menu, i) => (
                <div key={menu} className="menu-item">
                  <span className="menu-num">{i + 1}</span>
                  <span className="menu-name">{menu}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Taste & Texture */}
          <div className="modal-double-section">
            <div className="modal-section">
              <h4 className="section-title">👅 맛 특징</h4>
              <div className="badge-row">
                {r.taste.map(t => (
                  <span key={t} className="taste-badge" style={{ backgroundColor: tasteColors[t] || '#bdbdbd' }}>
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <div className="modal-section">
              <h4 className="section-title">✋ 식감</h4>
              <div className="badge-row">
                {r.texture.map(t => (
                  <span key={t} className="texture-badge" style={{ backgroundColor: textureColors[t] || '#bdbdbd' }}>
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Main Ingredients */}
          <div className="modal-section">
            <h4 className="section-title">🧺 주재료</h4>
            <div className="badge-row">
              {r.mainIngredient.map(i => (
                <span key={i} className="ingredient-badge">{i}</span>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div className="modal-section">
            <h4 className="section-title">🏷️ 태그</h4>
            <div className="badge-row">
              {r.tags.map(tag => (
                <span key={tag} className="tag-badge">#{tag}</span>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="modal-actions">
            <a
              href={`https://map.naver.com/p/search/${encodeURIComponent(r.name + ' ' + r.district)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="action-btn primary"
            >
              🗺️ 네이버 지도로 보기
            </a>
            <a
              href={`https://www.google.com/maps/search/${encodeURIComponent(r.name + ' ' + r.address)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="action-btn secondary"
            >
              📍 구글 지도로 보기
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
