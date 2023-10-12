import { useEntriesManager } from '@/features/components/entriesManager/useEntriesManager'
import styles from './EntriesManager.module.css'
import { Divider } from '@mui/material'
import { Entry } from '@/features/components/entriesManager/entry/Entry'

export const EntriesManager = () => {
  const { entries } = useEntriesManager()

  return (
    <div className={styles.entriesManager}>
      <div className={styles.gridContainer}>
        {entries.length > 0 ? entries.map(entry => <Entry {...entry} key={entry.id} />) : <p>No entries yet</p>}
      </div>
    </div>
  )
}
