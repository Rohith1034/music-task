import { useEffect, useMemo, useRef, useState } from "react"
import styles from "./FilterComp.module.css"
import type { filterType, songType, sortByType } from "../../MusicLibrary"
import GenericBtn from "../GenericBtn/GenericBtn"
import FilterSection from "../FilterSection/FilterSection"
import FIlterSection from "../FilterSection/FilterSection"

interface filterCompPropsType {
  songs: songType[]
  handleSort: (val: sortByType) => void
  handleFilter: (val: filterType) => void
}

function FilterComp({ songs, handleSort, handleFilter }: filterCompPropsType) {
  const [showSort, setShowSort] = useState<boolean>(false)
  const [showFilterOptions, setShowFilterOptions] = useState<boolean>(false)
  const [filterSelections, setFilterSelections] = useState<filterType>({ artist: [], album: [] })

  const sortByRef = useRef<HTMLDivElement>(null)
  const sortByDivRef = useRef<HTMLDivElement>(null)

  const filterRef = useRef<HTMLDivElement>(null)
  const filterDivRef = useRef<HTMLDivElement>(null)

  // To open and close sortBy dropdown
  const toggleSortBy = () => {
    setShowSort(!showSort)
  }

  // To open and close filter dropdown
  const toggleFilter = () => {
    setShowFilterOptions(!showFilterOptions)
  }

  // To apply the selected sort
  const applySort = (val: sortByType) => {
    handleSort(val)
    setShowSort(false)
  }

  // To handle the filter selection
  const handleFilterSelection = (type: "artist" | "album", value: string) => {
    if (filterSelections[type]?.includes(value)) {
      const filtered = filterSelections[type]?.filter((val: string) => val !== value)
      setFilterSelections((prevVal: any) => ({ ...prevVal, [type]: filtered }))
    } else {
      setFilterSelections((prevVal: any) => ({ ...prevVal, [type]: [...prevVal[type], value] }))
    }
  }

  // To handle clearing the filter
  const handleClear = () => {
    setFilterSelections({ artist: [], album: [] })
    applyFilter("clear")
  }

  // To apply the selected filter
  const applyFilter = (action: "clear" | "apply") => {
    const payload = action === "clear" ? { artist: [], album: [] } : filterSelections
    handleFilter(payload)
    setShowFilterOptions(false)
  }

  // To get the unique values of artist and album
  const filterValues: filterType = useMemo(() => {
    const result = songs.reduce(
      (acc: any, current: any) => {
        const val = { artist: acc.artist.includes(current.artist) ? acc.artist : [...acc.artist, current.artist], album: acc.album.includes(current.album) ? acc.album : [...acc.album, current.album] }
        return val
      },
      { artist: [], album: [] }
    )
    return result
  }, [songs])

  useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => {
      if (sortByRef?.current && !sortByRef.current.contains(e.target as Node) && sortByDivRef?.current && !sortByDivRef.current.contains(e.target as Node)) {
        setShowSort(false)
      }

      if (filterRef?.current && !filterRef?.current.contains(e.target as Node) && filterDivRef?.current && !filterDivRef?.current.contains(e.target as Node)) {
        setShowFilterOptions(false)
      }
    }
    window.addEventListener("mousedown", handleMouseDown)

    return () => {
      window.removeEventListener("mousedown", handleMouseDown)
    }
  }, [])

  return (
    <div className={`${styles.conainer} container`}>
      <div>
        <div className={styles.sortyBy} ref={sortByRef} onClick={() => toggleSortBy()}>
          Sort By
        </div>
        {showSort ? (
          <div className={styles.optionMenu} ref={sortByDivRef}>
            <div className={styles.sortOption} style={{ paddingTop: "10px" }} onClick={() => applySort("title")}>
              Alphabetical
            </div>
            <div className={styles.sortOption} onClick={() => applySort("artist")}>
              Artist
            </div>
            <div className={styles.sortOption} style={{ paddingBottom: "10px" }} onClick={() => applySort("album")}>
              Album
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
      <div>
        <div className={styles.sortyBy} onClick={() => toggleFilter()} ref={filterRef}>
          Filter
        </div>
        {showFilterOptions ? (
          <div className={styles.optionMenu} ref={filterDivRef}>
            <div className={styles.filterOption}>
              <div className={styles.filterName}>Artist</div>
              <div className={styles.filterOptionList}>
                {filterValues?.artist?.length > 0 ? (
                  filterValues?.artist?.map((val: string, index: number) => {
                    return <FilterSection key={index} val={val} type="artist" filterSelections={filterSelections} handleFilterSelection={handleFilterSelection} />
                  })
                ) : (
                  <div className={styles.noFilterOptionList}>No artist</div>
                )}
              </div>
            </div>

            <div className={styles.filterOption}>
              <div className={styles.filterName}>Album</div>
              <div className={styles.filterOptionList}>
                {filterValues?.album?.length > 0 ? (
                  filterValues?.album?.map((val: string, index: number) => {
                    return <FIlterSection key={index} val={val} type="album" filterSelections={filterSelections} handleFilterSelection={handleFilterSelection} />
                  })
                ) : (
                  <div className={styles.noFilterOptionList}>No album</div>
                )}
              </div>
            </div>
            <div className={styles.applyAndClearBtnDiv}>
              <GenericBtn title="Clear" backgColor="red" padding="4px 6px" fontsize="12px" handleClick={handleClear} />
              <GenericBtn title="Apply" backgColor="green" padding="4px 6px" fontsize="12px" handleClick={() => applyFilter("apply")} />
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  )
}

export default FilterComp
