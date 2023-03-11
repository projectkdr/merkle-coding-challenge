import { AxiosError, AxiosResponse } from 'axios'
import { ErrorMessage } from '../constants/constant'

// Define a function to handle error messages based on the response status and data
const errorMessage = (status: number | undefined, response?: AxiosResponse) => {
  // If the response has an ErrorMessage property, return its value
  if (response?.data?.ErrorMessage && typeof response?.data?.ErrorMessage === 'string') {
    return response.data.ErrorMessage
  }
  // If the response has a Message property, return its value
  if (response?.data?.Message && typeof response?.data?.Message === 'string') {
    return response.data.Message
  }
  // If the response data is a string, return it as the error message
  if (response?.data && typeof response?.data === 'string') {
    return response.data
  }
  // If the response status is 404, return a default message
  if (status === 404) {
    return ErrorMessage.STATUS_404
  }
  // Otherwise, return a generic error message
  return ErrorMessage.DEFAULT
}

// Define a wrapper function for async thunks that handles errors and rejections
export const asyncThunkWrapper = async <T> (
  thunkAPI: any,
  callback: () => Promise<T>
) => {
  try {
    // Call the original callback function and return its result
    console.log('try')
    return await callback()
  } catch (error: unknown) {
    // If the error is an AxiosError with a "canceled" message, return a "canceled" status
    if (error instanceof Error && error.message === 'canceled') {
      return { status: 'canceled' }
    }

    // If the error is an AxiosError, generate an error message based on the response
    const axiosError = error as AxiosError
    const errorMsg = errorMessage(
      axiosError?.response?.status,
      axiosError?.response
    )
    console.log(`error - ${error}`)
    // Use the "rejectWithValue" method of thunkAPI to reject the thunk with the error message
    return thunkAPI.rejectWithValue(errorMsg)
  }
}
