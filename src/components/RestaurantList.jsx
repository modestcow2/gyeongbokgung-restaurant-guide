import RestaurantCard from './RestaurantCard'

export default function RestaurantList({ restaurants, onSelect }) {
  if (restaurants.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">🍽️</div>
        <h3>조건에 맞는 식당이 없습니다</h3>
        <p>필터 조건을 변경해 보세요!</p>
      </div>
    )
  }

  return (
    <div className="restaurant-grid">
      {restaurants.map(restaurant => (
        <RestaurantCard
          key={restaurant.id}
          restaurant={restaurant}
          onClick={onSelect}
        />
      ))}
    </div>
  )
}
