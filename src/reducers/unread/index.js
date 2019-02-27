import actionType from '../../actions/actionType'
const initState = {
  content: [
    {
      id: 1,
      title: 'asfnkdbndfjkbhndiso',
      hasRead: true
    },
    {
      id: 2,
      title: 'asfnkdbndfjkbhndiso',
      hasRead: false
    },
    {
      id: 3,
      title: 'asfnkdbndfjkbhndiso',
      hasRead: true
    },
  ]
}

export default (state = initState, action) => {
  switch(action.type) {
    case actionType.MASK_NOTIFICATION_READ:
    return {
      ...state,
      content: state.content.map( item => {
        if (item.id === action.payload.id) {
          item.hasRead = true
        }
        return item;
      })
    }
    default:
    return state
  }
}