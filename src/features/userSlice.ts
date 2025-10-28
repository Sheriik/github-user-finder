import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { UserData, Repo } from '../types'

const PER_PAGE = 10

export const fetchUser = createAsyncThunk('user/fetchUser', async (username: string, thunkAPI) => {
  const res = await axios.get(`https://api.github.com/users/${username}`)
  return res.data as UserData
})

export const fetchRepos = createAsyncThunk('user/fetchRepos', async (params: { username: string; page: number }) => {
  const res = await axios.get(`https://api.github.com/users/${params.username}/repos`, {
    params: { per_page: PER_PAGE, page: params.page, sort: 'updated' }
  })
  return res.data as Repo[]
})

const userSlice = createSlice({
  name: 'user',
  initialState: {
    userData: null as UserData | null,
    repos: [] as Repo[],
    loading: false,
    error: null as string | null,
    page: 1,
    hasMore: true
  },
  reducers: {
    resetUser(state) {
      state.userData = null
      state.repos = []
      state.page = 1
      state.hasMore = true
      state.error = null
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true; state.error = null
      })
      .addCase(fetchUser.fulfilled, (state, action: PayloadAction<UserData>) => {
        state.loading = false; state.userData = action.payload
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false; state.error = action.error.message || 'Failed to fetch user'
      })
      .addCase(fetchRepos.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchRepos.fulfilled, (state, action: PayloadAction<Repo[]>) => {
        state.loading = false
        if (action.payload.length === 0) state.hasMore = false
        state.repos = [...state.repos, ...action.payload]
        state.page = state.page + 1
      })
      .addCase(fetchRepos.rejected, (state, action) => {
        state.loading = false; state.error = action.error.message || 'Failed to fetch repos'
      })
  }
})

export const { resetUser } = userSlice.actions
export default userSlice.reducer
