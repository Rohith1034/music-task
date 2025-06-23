import type { filterType } from "../../MusicLibrary"
import styles from "./FilterSection.module.css"

interface FilterSectionProps {
  val: string
  filterSelections: filterType
  handleFilterSelection: (type: "artist" | "album", value: string) => void
  type: "artist" | "album"
}

function FIlterSection({ val, filterSelections, handleFilterSelection, type }: FilterSectionProps) {
  return (
    <div className={styles.filterOptionList}>
      <input className={styles.filterCheckbox} type="checkbox" id={val} name="artistsCheckbox" checked={filterSelections[type]?.includes(val) || false} onChange={() => handleFilterSelection(type, val)} />
      <label htmlFor={val} className={styles.filterLabel}>
        {val}
      </label>
    </div>
  )
}

export default FIlterSection
