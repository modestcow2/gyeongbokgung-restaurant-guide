export default function Header() {
  return (
    <header className="header">
      <div className="header-inner">
        <div className="header-logo">
          <span className="logo-icon">🗺️</span>
          <div>
            <h1 className="header-title">경복궁 맛집 탐험</h1>
            <p className="header-subtitle">경복궁역 3km 이내 식당 추천 가이드</p>
          </div>
        </div>
        <div className="header-badge">
          <span>📍 경복궁역 중심</span>
          <span>🔍 반경 3km</span>
          <span>🍽️ 25곳 엄선</span>
        </div>
      </div>
    </header>
  )
}
