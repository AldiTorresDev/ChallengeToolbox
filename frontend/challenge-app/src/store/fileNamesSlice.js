import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
  fileNamesList: [],
  fileNamesLoading: true,
  fileNamesError: null
}

export const fetchFileNames = createAsyncThunk('files/fetchFileNames', async (_, { rejectWithValue }) => {
  try {
    const response = await fetch('http://localhost:3000/files/list')
    const data = await response.json()
    if (!response.ok) {
      return rejectWithValue(data.error)
    }

    return data.files
  } catch (error) {
    return rejectWithValue('Error desconocido al obtener la lista de archivos')
  }
})

const fileNamesSlice = createSlice({
  name: 'fileNames',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFileNames.pending, (state) => {
        state.fileNamesLoading = true
      })
      .addCase(fetchFileNames.fulfilled, (state, action) => {
        state.fileNamesError = null
        state.fileNamesLoading = false
        state.fileNamesList = action.payload
      })
      .addCase(fetchFileNames.rejected, (state, action) => {
        state.fileNamesLoading = false
        state.fileNamesError = action.payload || 'Error desconocido al obtener la lista de archivos'
      })
  }
})

export default fileNamesSlice.reducer
