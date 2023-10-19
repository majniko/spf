import styles from './summaryLine.module.css'

export type SummaryLineProps = {
  categoryName: string
  amount: number
}

export const SummaryLine = (props: SummaryLineProps) => {
  const { categoryName, amount } = props

  return (
    <>
      <div className={styles.categoryName}>{categoryName}</div>
      <div className={styles.amount}>{amount} Kč</div>
    </>
  )
}
