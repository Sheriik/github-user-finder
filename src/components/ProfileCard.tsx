import React from 'react'
import { Card, CardContent, Avatar, Typography, Grid, Button, CardHeader, Chip } from '@mui/material'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import { useAppSelector } from '../hooks'

export default function ProfileCard() {
  const userData = useAppSelector(s => s.user.userData)
  if (!userData) return null

  return (
    <Card sx={{ width: '100%' }}>
      <CardHeader
        avatar={<Avatar src={userData.avatar_url || undefined} sx={{ width: 72, height: 72 }} />}
        title={
          <div>
            <Typography variant="h6">{userData.name || userData.login}</Typography>
            <Typography variant="subtitle2" color="text.secondary">@{userData.login}</Typography>
          </div>
        }
        action={
          <Button href={userData.html_url} target="_blank" rel="noreferrer" endIcon={<OpenInNewIcon />}>
            View on GitHub
          </Button>
        }
      />
      <CardContent>
        {userData.bio && <Typography paragraph>{userData.bio}</Typography>}
        <Grid container spacing={1}>
          <Grid item><Chip label={`Followers: ${userData.followers ?? 0}`} /></Grid>
          <Grid item><Chip label={`Following: ${userData.following ?? 0}`} /></Grid>
          <Grid item><Chip label={`Public repos: ${userData.public_repos ?? 0}`} /></Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}
