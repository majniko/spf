import Modal from '@mui/material/Modal'
import React from 'react'
import { AddEntryForm } from '@/features/components/addEntryForm/AddEntryForm'
import styles from './AddEntryModal.module.css'

export type AddEntryModalProps = {
  open: boolean
  handleClose: () => void
}

export const AddEntryModal = ({ open, handleClose }: AddEntryModalProps): React.ReactElement => {
  return (
    <Modal open={open} onClose={handleClose}>
      <div className={styles.addEntryContainer}>
        <AddEntryForm />
      </div>
    </Modal>
  )
}
