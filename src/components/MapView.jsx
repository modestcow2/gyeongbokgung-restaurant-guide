import { useState } from 'react'

// 경복궁역 좌표
const CENTER = { lat: 37.5759, lng: 126.9769 }

// 위도/경도를 SVG 좌표로 변환
function toSVG(lat, lng, width = 800, height = 600) {
  // 경복궁역 기준 3km 범위
  const latRange = 0.027 // ~3km
  const lngRange = 0.033 // ~3km
  const x = ((lng - (CENTER.lng - lngRange / 2)) / lngRange) * width
  const y = height - ((lat - (CENTER.lat - latRange / 2)) / latRange) * height
  return { x, y }
}

const cuisineColors = {
  '한식': '#66bb6a',
  '중식': '#ffa726',
  '일식': '#42a5f5',
  '이탈리안': '#ec407a',
  '아메리칸차이니즈': '#ab47bc',
  '베이커리': '#ffca28'
}

export default function MapView({ restaurants, onSelect }) {
  const [hoveredId, setHoveredId] = useState(null)
  const W = 800
  const H = 600

  const centerSVG = toSVG(CENTER.lat, CENTER.lng, W, H)

  return (
    <div className="map-view">
      <div className="map-legend">
        {Object.entries(cuisineColors).map(([cuisine, color]) => (
          <span key={cuisine} className="legend-item">
            <span className="legend-dot" style={{ background: color }} />
            {cuisine}
          </span>
        ))}
      </div>

      <div className="map-container">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="map-svg"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* 배경 */}
          <defs>
            <radialGradient id="bgGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#e8f5e9" />
              <stop offset="100%" stopColor="#c8e6c9" />
            </radialGradient>
            <filter id="shadow">
              <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.3"/>
            </filter>
          </defs>
          <rect width={W} height={H} fill="url(#bgGrad)" rx="12" />

          {/* 3km 반경 원 */}
          <circle
            cx={centerSVG.x}
            cy={centerSVG.y}
            r={Math.min(W, H) * 0.45}
            fill="rgba(255,255,255,0.3)"
            stroke="#81c784"
            strokeWidth="2"
            strokeDasharray="8 4"
          />

          {/* 격자선 */}
          {[1,2,3,4].map(i => (
            <g key={i}>
              <line x1={W/5*i} y1={0} x2={W/5*i} y2={H} stroke="rgba(255,255,255,0.4)" strokeWidth="1"/>
              <line x1={0} y1={H/5*i} x2={W} y2={H/5*i} stroke="rgba(255,255,255,0.4)" strokeWidth="1"/>
            </g>
          ))}

          {/* 경복궁 심볼 */}
          <g>
            <rect x={centerSVG.x - 35} y={centerSVG.y - 20} width={70} height={40}
              fill="#fff9c4" stroke="#f9a825" strokeWidth="2" rx="4"
              filter="url(#shadow)"
            />
            <text x={centerSVG.x} y={centerSVG.y - 5} textAnchor="middle"
              fontSize="12" fontWeight="bold" fill="#f57f17">🏯 경복궁역</text>
            <text x={centerSVG.x} y={centerSVG.y + 10} textAnchor="middle"
              fontSize="9" fill="#795548">중심점</text>
          </g>

          {/* 식당 마커 */}
          {restaurants.map(r => {
            const pos = toSVG(r.lat, r.lng, W, H)
            const color = cuisineColors[r.cuisine[0]] || '#90a4ae'
            const isHovered = hoveredId === r.id
            return (
              <g
                key={r.id}
                transform={`translate(${pos.x}, ${pos.y})`}
                style={{ cursor: 'pointer' }}
                onMouseEnter={() => setHoveredId(r.id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => onSelect(r)}
              >
                {/* 마커 원 */}
                <circle
                  r={isHovered ? 20 : 16}
                  fill={color}
                  stroke="white"
                  strokeWidth={isHovered ? 3 : 2}
                  filter="url(#shadow)"
                  style={{ transition: 'all 0.15s' }}
                />
                <text textAnchor="middle" y={5} fontSize={isHovered ? 14 : 12}>
                  {r.image}
                </text>

                {/* 호버시 이름 툴팁 */}
                {isHovered && (
                  <g>
                    <rect
                      x={-55} y={-52} width={110} height={28}
                      fill="white" rx="6" filter="url(#shadow)"
                    />
                    <text textAnchor="middle" y={-33} fontSize="11" fontWeight="bold" fill="#333">
                      {r.name}
                    </text>
                    <text textAnchor="middle" y={-20} fontSize="9" fill="#666">
                      {r.distance}km · {r.cuisine[0]}
                    </text>
                  </g>
                )}
              </g>
            )
          })}
        </svg>

        {/* 거리 표시 */}
        <div className="map-distance-label">반경 3km</div>
      </div>

      {/* 식당 목록 (지도 아래) */}
      <div className="map-list">
        {restaurants.map(r => (
          <button
            key={r.id}
            className={`map-list-item ${hoveredId === r.id ? 'highlighted' : ''}`}
            onClick={() => onSelect(r)}
            onMouseEnter={() => setHoveredId(r.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            <span className="map-list-emoji">{r.image}</span>
            <div className="map-list-info">
              <strong>{r.name}</strong>
              <span>{r.cuisine[0]} · {r.distance}km</span>
            </div>
            <span
              className="map-list-dot"
              style={{ background: cuisineColors[r.cuisine[0]] || '#90a4ae' }}
            />
          </button>
        ))}
      </div>
    </div>
  )
}
