const cuisineColor = {
  '한식': '#e8f5e9',
  '중식': '#fff3e0',
  '일식': '#e3f2fd',
  '이탈리안': '#fce4ec',
  '아메리칸차이니즈': '#f3e5f5',
  '베이커리': '#fffde7'
}

const cuisineBorder = {
  '한식': '#66bb6a',
  '중식': '#ffa726',
  '일식': '#42a5f5',
  '이탈리안': '#ec407a',
  '아메리칸차이니즈': '#ab47bc',
  '베이커리': '#ffca28'
}

export default function RestaurantCard({ restaurant, onClick }) {
  const primaryCuisine = restaurant.cuisine[0]
  const bgColor = cuisineColor[primaryCuisine] || '#f5f5f5'
  const borderColor = cuisineBorder[primaryCuisine] || '#bdbdbd'

  return (
    <article
      className="restaurant-card"
      onClick={() => onClick(restaurant)}
      style={{ '--card-border': borderColor, '--card-bg': bgColor }}
    >
      <div className="card-image-area" style={{ background: bgColor }}>
        <span className="card-emoji">{restaurant.image}</span>
        <div className="card-distance">
          📍 {restaurant.distance}km
        </div>
      </div>

      <div className="card-body">
        <div className="card-top">
          <h3 className="card-name">{restaurant.name}</h3>
          <div className="card-cuisines">
            {restaurant.cuisine.map(c => (
              <span
                key={c}
                className="cuisine-badge"
                style={{ borderColor, color: borderColor }}
              >
                {c}
              </span>
            ))}
          </div>
        </div>

        <p className="card-address">
          <span>📌</span> {restaurant.address}
        </p>

        <div className="card-menus">
          {restaurant.representativeMenu.slice(0, 3).map(menu => (
            <span key={menu} className="menu-tag">#{menu}</span>
          ))}
        </div>

        <div className="card-tags-row">
          <div className="taste-icons">
            {restaurant.taste.map(t => (
              <span key={t} className="mini-tag taste">{t}</span>
            ))}
            {restaurant.texture.map(t => (
              <span key={t} className="mini-tag texture">{t}</span>
            ))}
          </div>
        </div>

        <p className="card-price">{restaurant.priceRange}</p>

        <button className="card-detail-btn">자세히 보기 →</button>
      </div>
    </article>
  )
}
