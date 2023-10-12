import Modal from '@mui/material/Modal'
import React from 'react'
import { AddEntryForm } from '@/features/components/addEntryForm/AddEntryForm'

export const addEntryModal = (open: boolean, handleClose: () => void): React.ReactElement => {
  return (
    <Modal open={open} onClose={handleClose}>
      <AddEntryForm />
    </Modal>
  )
}
