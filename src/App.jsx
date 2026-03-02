import { useState, useMemo } from 'react'
import FilterPanel from './components/FilterPanel'
import RestaurantList from './components/RestaurantList'
import RestaurantModal from './components/RestaurantModal'
import MapView from './components/MapView'
import Header from './components/Header'
import { restaurants } from './data/restaurants'
import './App.css'

function App() {
  const [selectedTastes, setSelectedTastes] = useState([])
  const [selectedTextures, setSelectedTextures] = useState([])
  const [selectedIngredients, setSelectedIngredients] = useState([])
  const [selectedCuisines, setSelectedCuisines] = useState([])
  const [selectedRestaurant, setSelectedRestaurant] = useState(null)
  const [viewMode, setViewMode] = useState('grid') // 'grid' or 'map'
  const [sortBy, setSortBy] = useState('distance') // 'distance' | 'name'

  const filteredRestaurants = useMemo(() => {
    let result = restaurants

    if (selectedTastes.length > 0) {
      result = result.filter(r =>
        selectedTastes.some(t => r.taste.includes(t))
      )
    }
    if (selectedTextures.length > 0) {
      result = result.filter(r =>
        selectedTextures.some(t => r.texture.includes(t))
      )
    }
    if (selectedIngredients.length > 0) {
      result = result.filter(r =>
        selectedIngredients.some(i => r.mainIngredient.includes(i))
      )
    }
    if (selectedCuisines.length > 0) {
      result = result.filter(r =>
        selectedCuisines.some(c => r.cuisine.includes(c))
      )
    }

    if (sortBy === 'distance') {
      result = [...result].sort((a, b) => a.distance - b.distance)
    } else {
      result = [...result].sort((a, b) => a.name.localeCompare(b.name, 'ko'))
    }

    return result
  }, [selectedTastes, selectedTextures, selectedIngredients, selectedCuisines, sortBy])

  const toggleFilter = (value, selected, setSelected) => {
    setSelected(prev =>
      prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]
    )
  }

  const clearAllFilters = () => {
    setSelectedTastes([])
    setSelectedTextures([])
    setSelectedIngredients([])
    setSelectedCuisines([])
  }

  const activeFilterCount =
    selectedTastes.length + selectedTextures.length +
    selectedIngredients.length + selectedCuisines.length

  return (
    <div className="app">
      <Header />

      <main className="main-content">
        <FilterPanel
          selectedTastes={selectedTastes}
          selectedTextures={selectedTextures}
          selectedIngredients={selectedIngredients}
          selectedCuisines={selectedCuisines}
          onToggleTaste={(v) => toggleFilter(v, selectedTastes, setSelectedTastes)}
          onToggleTexture={(v) => toggleFilter(v, selectedTextures, setSelectedTextures)}
          onToggleIngredient={(v) => toggleFilter(v, selectedIngredients, setSelectedIngredients)}
          onToggleCuisine={(v) => toggleFilter(v, selectedCuisines, setSelectedCuisines)}
          onClearAll={clearAllFilters}
          activeFilterCount={activeFilterCount}
        />

        <div className="results-section">
          <div className="results-header">
            <div className="results-info">
              <span className="results-count">
                <strong>{filteredRestaurants.length}</strong>개 식당 발견
              </span>
              {activeFilterCount > 0 && (
                <span className="active-filters-badge">
                  {activeFilterCount}개 필터 적용 중
                </span>
              )}
            </div>
            <div className="results-controls">
              <select
                className="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="distance">거리순</option>
                <option value="name">이름순</option>
              </select>
              <div className="view-toggle">
                <button
                  className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                  onClick={() => setViewMode('grid')}
                  title="그리드 뷰"
                >
                  ⊞
                </button>
                <button
                  className={`view-btn ${viewMode === 'map' ? 'active' : ''}`}
                  onClick={() => setViewMode('map')}
                  title="지도 뷰"
                >
                  🗺
                </button>
              </div>
            </div>
          </div>

          {viewMode === 'grid' ? (
            <RestaurantList
              restaurants={filteredRestaurants}
              onSelect={setSelectedRestaurant}
            />
          ) : (
            <MapView
              restaurants={filteredRestaurants}
              onSelect={setSelectedRestaurant}
            />
          )}
        </div>
      </main>

      {selectedRestaurant && (
        <RestaurantModal
          restaurant={selectedRestaurant}
          onClose={() => setSelectedRestaurant(null)}
        />
      )}
    </div>
  )
}

export default App
