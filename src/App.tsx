import React, {useMemo, useState} from 'react'
import { useAppSelector, useAppDispatch } from './hooks'
import { ThemeProvider, createTheme, CssBaseline, IconButton, Container, Box, Paper, Tabs, Tab } from '@mui/material'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import Brightness7Icon from '@mui/icons-material/Brightness7'
import SearchBar from './components/SearchBar'
import ProfileCard from './components/ProfileCard'
import RepoList from './components/RepoList'
import AboutSection from "./components/AboutSection"
import { toggleTheme } from './features/themeSlice'

export default function App() {
  const mode = useAppSelector(s => s.theme.mode)
  const [tabValue, setTabValue] = useState(0)
  const dispatch = useAppDispatch()
  const theme = useMemo(() => createTheme({ palette: { mode } }), [mode])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Box component='header' sx={{ bgcolor: 'background.paper', py: 1 }}>
          <Container sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <h2 style={{ margin: 0 }}>GitHub User Finder</h2>
            <Box sx={{ flexGrow: 1 }} />
            <IconButton onClick={() => dispatch(toggleTheme())} color="inherit">
              {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
          </Container>
        </Box>
        <Container sx={{ py: 3 }}>
          <SearchBar />
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '360px 1fr' }, gap: 2 }}>
            <Box><ProfileCard /></Box>
            <Paper sx={{ p: 2 }}>
              <Tabs value={tabValue}
                    onChange={(e, newValue) => setTabValue(newValue)}
                    sx={{ borderBottom: "1px solid", borderColor: "divider", flexShrink: 0 }}>
                <Tab label="Repositories" />
                <Tab label="About" />
              </Tabs>
              <Box sx={{ mt: 2 }}>
                {tabValue === 0 && (
                <RepoList />
                )}
                {tabValue === 1 && <AboutSection />}
              </Box>
            </Paper>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  )
}
