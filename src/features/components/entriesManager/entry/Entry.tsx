import styles from './Entry.module.css'
import dayjs from 'dayjs'

export type entryProps = {
  id: string
  title: string
  amount: number
  isExpense: boolean
  categoryId: string
  categoryName: string
  date: string
}

export const Entry = (props: entryProps) => {
  const { title, amount, isExpense, categoryId, categoryName, date } = props

  return (
    <>
      <div className={styles.isExpense}>
        <p>{isExpense ? '-' : '+'}</p>
      </div>
      <div className={styles.amount}>
        <p>{amount}</p>
      </div>
      <div className={styles.entryName}>
        <p>{title}</p>
      </div>
      <div className={styles.category}>
        <p>{categoryName}</p>
      </div>
      <div className={styles.date}>
        <p>{dayjs(date).format('DD. MM. YYYY')}</p>
      </div>
    </>
  )
}
