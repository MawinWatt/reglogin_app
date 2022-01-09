import Head from 'next/head'
import Link from 'next/link'
import {useState, useContext} from 'react'
import {DataContext} from '../store/GlobalState'
import {postData} from '../utils/fetchData'
import Cookie from 'js-cookie'

const Signin = () => {

  const initialState = { username: '', password: ''}
  const [userData, setUserData] = useState(initialState)
  const { username, password } = userData

  const {state, dispatch} = useContext(DataContext)

  const handleChangeInput = e => {
      const {name, value} = e.target
      setUserData({...userData, [name]:value})
      dispatch({type: 'NOTIFY', payload: {}})
  }
   
  const handleSubmit = async e => {
      e.preventDefault()
      dispatch({type: 'NOTIFY', payload: {loading: true} })
      const res = await postData('auth/login', userData)

      if(res.err) return dispatch({type: 'NOTIFY', payload: {error: res.err}})
      dispatch({type: 'NOTIFY', payload: {success: res.msg}})

      dispatch({type: 'AUTH', payload: {
        token: res.access_token,
        user: res.user
      }})

      Cookie.set('refreshtoken', res.refresh_token, {
        path: 'api/auth/accessToken',
        expires: 7
      })

      localStorage.setItem('firstLogin', true)

  }

  return (
    <div>
      <Head>
        <title>Register Page</title>
      </Head>
      <form className="mx-auto my-4" style={{maxWidth: '500px'}} onSubmit={handleSubmit}>
        <div className="form-group">
            <label htmlFor="exampleInputEmail1">Username</label>
            <input type="username" className="form-control" id="username" aria-describedby="usernameHelp" placeholder="Username" 
            name="username" value={username} onChange={handleChangeInput} />
        </div>
        <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" 
            name="password" value={password} onChange={handleChangeInput} />
        </div>

        <button type="submit" className="btn btn-dark w-100">Login</button>
        <p className="my-2">You don't have an account? 
        <Link href="/register"><a style={{color: 'crimson'}}>Register</a></Link></p>
       </form>
    </div>
  );
};

export default Signin;
