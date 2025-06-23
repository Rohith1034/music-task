import styles from "./GenericBtn.module.css"

interface genericBtnPropTypes {
  title: string
  handleClick: () => void
  backgColor: string
  padding?: string
  fontsize?: string
  height?: string
}

function GenericBtn({ title, height, backgColor, padding, fontsize, handleClick }: genericBtnPropTypes) {
  return (
    <button className={styles.btn} onClick={handleClick} style={{ height: height ? height : "", backgroundColor: backgColor, padding: padding ? padding : "5px 15px", fontSize: fontsize ? fontsize : "" }}>
      {title}
    </button>
  )
}

export default GenericBtn
