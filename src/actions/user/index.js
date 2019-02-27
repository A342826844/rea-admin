import actionsType from '../actionType'
import { userLogin } from '../../api'

const loginSuccess = (data) => {
  console.log("actions:  " + data)
  return {
    type: actionsType.LOGIN_SUCCESS,
    payload: data
  }
}

export const doLogin = (data) => {
  return dispath => {
    userLogin(data)
      .then(resp => {
        if(resp.status === 1){
          console.log(resp)
          dispath(loginSuccess(resp))
        }else{
          console.log(resp)
          //TODO:
        }
      })
      .catch(err => {
        console.log(err)
      })
  }
}
export const logout = () => {
  return {
    type: actionsType.LOGOUT
  }
}