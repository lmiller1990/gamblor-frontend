const createAsyncActions = state => [
  ()      => ({ type: `${state}/REQEUST` }),
  payload => ({ type: `${state}/SUCCESS`, payload }),
  error   => ({ type: `${state}/FAILURE`, error })
]

export {
  createAsyncActions
}
