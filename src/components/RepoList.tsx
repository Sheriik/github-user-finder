import React, { useCallback } from 'react'
import { List, ListItem, ListItemText, ListItemAvatar, Avatar, Typography, CircularProgress, Box } from '@mui/material'
import StarIcon from '@mui/icons-material/Star'
import { useAppDispatch, useAppSelector } from '../hooks'
import { fetchRepos } from '../features/userSlice'
import { useInfiniteScroll } from '../hooks/useInfiniteScroll'

export default function RepoList() {
  const { repos, loading, hasMore, userData, page } = useAppSelector(s => s.user)
  const dispatch = useAppDispatch()

  const loadMore = useCallback(() => {
    if (!userData) return
    dispatch(fetchRepos({ username: userData.login, page }))
  }, [dispatch, userData, page])

  useInfiniteScroll(loadMore, hasMore, loading)

  if (!repos || repos.length === 0) return <Typography sx={{ mt: 2 }}>No repositories</Typography>

  return (
    <>
      <List>
        {repos.map(r => (
          <ListItem key={r.id} alignItems="flex-start" divider>
            <ListItemAvatar>
              <Avatar>{r.name.charAt(0).toUpperCase()}</Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={<a href={r.html_url} target="_blank" rel="noreferrer">{r.name}</a>}
              secondary={<Typography variant="body2">{r.description}</Typography>}
            />
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <StarIcon />
              <Typography>{r.stargazers_count}</Typography>
            </Box>
          </ListItem>
        ))}
      </List>
      <div id="sentinel" style={{ height: 40, display: 'flex', justifyContent: 'center' }}>
        {loading && <CircularProgress size={24} />}
      </div>
    </>
  )
}
