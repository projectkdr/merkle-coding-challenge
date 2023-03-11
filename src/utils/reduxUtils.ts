const errorMessage = (status: number, response?: any) => {
  // if backend is giving any error response then use it else so something went wrong standard message
  if (response?.data?.ErrorMessage && typeof response?.data?.ErrorMessage === 'string') {
    return response.data.ErrorMessage
  }
  if (response?.data?.Message && typeof response?.data?.Message === 'string') {
    return response.data.Message
  }
  if (response?.data && typeof response?.data === 'string') {
    return response.data
  }
  if (status === 404) {
    return 'Data is not available.'
  }
  return 'Something went wrong.'
}

// eslint-disable-next-line import/prefer-default-export
export const asyncThunkWrapper = async (thunkAPI: any, callback: () => Promise<any>) => {
  try {
    return await callback()
  } catch (error: any) {
    if (error.message === 'canceled') return { status: 'canceled' }

    console.error(error)
    const errorMsg = errorMessage(error?.response?.status, error?.response)
    return thunkAPI.rejectWithValue(errorMsg)
  }
}
