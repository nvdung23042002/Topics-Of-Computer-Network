export default (err: any) => {
  if (err.message === 'Network Error') return 'NETWORK_ERROR'
  if (err.code === 'ECONNABORTED') return 'TIME_OUT'
  if (err.message === 'ERRORS_AUTH_USER_04') return 'ERRORS_AUTH_USER_04'
  if (err?.response)
    return err?.response?.data?.error ?? err?.response?.code ?? err?.response?.message ?? err?.response?.data
  return {
    response: {
      data: {
        error: null
      }
    }
  }
}
export const commonErrors = ['NETWORK_ERROR', 'TIME_OUT', 'ERROR_UNKNOWN']
