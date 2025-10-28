import React, { useState, useCallback } from 'react'
import { TextField, Box } from '@mui/material'
import debounce from 'lodash.debounce'
import { useAppDispatch } from '../hooks'
import { fetchUser, resetUser, fetchRepos } from '../features/userSlice'

export default function SearchBar() {
  const [value, setValue] = useState('')
  const dispatch = useAppDispatch()

  const handleSearch = useCallback(
    debounce((username: string) => {
      if (!username) {
        dispatch(resetUser())
        return
      }
      dispatch(resetUser())
      dispatch(fetchUser(username))
      dispatch(fetchRepos({ username, page: 1 }))
    }, 500),
    []
  )

  return (
    <Box sx={{ width: '100%', maxWidth: 720, mx: 'auto', my: 2 }}>
      <TextField
        fullWidth
        placeholder="Enter GitHub username"
        value={value}
        onChange={e => {
          setValue(e.target.value)
          handleSearch(e.target.value.trim())
        }}
      />
    </Box>
  )
}
