import { useEntriesManager } from '@/features/components/entriesManager/useEntriesManager'
import styles from './EntriesManager.module.css'
import { Fab } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { Entry } from '@/features/components/entriesManager/entry/Entry'
import { AddEntryModal } from '@/features/components/modals/addEntryModal/AddEntryModal'

export const EntriesManager = () => {
  const { entries, isModalOpen, swapIsModalOpen } = useEntriesManager()

  return (
    <>
      <div className={styles.entriesManager}>
        <div className={styles.gridContainer}>
          {entries.length > 0 ? entries.map(entry => <Entry {...entry} key={entry.id} />) : <p>No entries yet</p>}
        </div>
      </div>
      <Fab color="primary" aria-label="add" onClick={swapIsModalOpen} className={styles.fab}>
        <AddIcon />
      </Fab>
      <AddEntryModal open={isModalOpen} handleClose={swapIsModalOpen} />
    </>
  )
}
