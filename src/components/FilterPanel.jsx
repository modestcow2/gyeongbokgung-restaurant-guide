import { cuisineTypes, tasteTypes, textureTypes, ingredientTypes } from '../data/restaurants'

const tasteEmoji = {
  '단맛': '🍯', '짠맛': '🧂', '신맛': '🍋', '쓴맛': '☕', '매운맛': '🌶️'
}
const textureEmoji = {
  '바삭한': '🥨', '쫄깃한': '🍜', '찐득한': '🍯', '부드러운': '🧁'
}
const ingredientEmoji = {
  '쌀': '🌾', '면': '🍜', '돼지고기': '🥓', '소고기': '🥩',
  '닭고기': '🍗', '어류': '🐟', '조개류': '🦪', '채소': '🥦'
}
const cuisineEmoji = {
  '한식': '🍚', '중식': '🥢', '일식': '🍣', '이탈리안': '🍝',
  '아메리칸차이니즈': '🥡', '베이커리': '🥐'
}

function FilterGroup({ title, items, selected, onToggle, emojiMap, colorClass }) {
  return (
    <div className={`filter-group ${colorClass}`}>
      <h3 className="filter-group-title">{title}</h3>
      <div className="filter-chips">
        {items.map(item => (
          <button
            key={item}
            className={`filter-chip ${selected.includes(item) ? 'active' : ''}`}
            onClick={() => onToggle(item)}
          >
            <span className="chip-emoji">{emojiMap[item]}</span>
            <span>{item}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

export default function FilterPanel({
  selectedTastes, selectedTextures, selectedIngredients, selectedCuisines,
  onToggleTaste, onToggleTexture, onToggleIngredient, onToggleCuisine,
  onClearAll, activeFilterCount
}) {
  return (
    <aside className="filter-panel">
      <div className="filter-header">
        <h2 className="filter-title">
          <span>🔍</span> 필터 검색
        </h2>
        {activeFilterCount > 0 && (
          <button className="clear-btn" onClick={onClearAll}>
            ✕ 초기화 ({activeFilterCount})
          </button>
        )}
      </div>

      <FilterGroup
        title="🍴 요리 국적"
        items={cuisineTypes}
        selected={selectedCuisines}
        onToggle={onToggleCuisine}
        emojiMap={cuisineEmoji}
        colorClass="group-cuisine"
      />

      <FilterGroup
        title="👅 맛"
        items={tasteTypes}
        selected={selectedTastes}
        onToggle={onToggleTaste}
        emojiMap={tasteEmoji}
        colorClass="group-taste"
      />

      <FilterGroup
        title="✋ 식감"
        items={textureTypes}
        selected={selectedTextures}
        onToggle={onToggleTexture}
        emojiMap={textureEmoji}
        colorClass="group-texture"
      />

      <FilterGroup
        title="🧺 주재료"
        items={ingredientTypes}
        selected={selectedIngredients}
        onToggle={onToggleIngredient}
        emojiMap={ingredientEmoji}
        colorClass="group-ingredient"
      />

      {activeFilterCount === 0 && (
        <p className="filter-hint">
          원하는 조건을 선택하면<br />맞춤 식당이 검색됩니다!
        </p>
      )}
    </aside>
  )
}
