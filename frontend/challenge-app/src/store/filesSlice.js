import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
  filesList: [],
  filesLoading: true,
  filesError: null
}

const transformData = (data) => {
  const transformedData = []
  data.forEach(item => {
    item.lines.forEach(line => {
      transformedData.push({
        file: item.file,
        text: line.text,
        number: line.number,
        hex: line.hex
      })
    })
  })
  return transformedData
}

export const fetchFiles = createAsyncThunk('files/fetchFiles', async (fileName, { rejectWithValue }) => {
  try {
    let url = 'http://localhost:3000/files/data'
    if (fileName) {
      url += `?fileName=${fileName}`
    }
    const response = await fetch(url)
    const rawData = await response.json()
    if (!response.ok) {
      return rejectWithValue(rawData.error)
    }

    return transformData(rawData)
  } catch (error) {
    return rejectWithValue('Error desconocido al cargar los archivos')
  }
})

const filesSlice = createSlice({
  name: 'files',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFiles.pending, (state) => {
        state.filesLoading = true
      })
      .addCase(fetchFiles.fulfilled, (state, action) => {
        state.filesError = null
        state.filesLoading = false
        state.filesList = action.payload
      })
      .addCase(fetchFiles.rejected, (state, action) => {
        console.log('action:', action)
        state.filesLoading = false
        state.filesError = action.payload || 'Error desconocido al cargar los archivos'
      })
  }
})

export default filesSlice.reducer
