import React from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { Link } from 'react-router'
import { signOut } from '../actions/authentication'

const Header = ({ isLoggedIn, username, signOut }) => {
  return (
    <div className="p-3 border">
      {isLoggedIn &&
        <div className="row">
          <div className="col-9">
            Hello {username}!
          </div>
          <Link to="/profile">
            <div className="col-2">
              <button className="btn btn-outline-secondary">
                Your profile
              </button>
            </div>
          </Link>
          <div className="col-1">
            <button className="btn btn-outline-secondary" onClick={signOut}>
              Log out
            </button>
          </div>
        </div>}
    </div>
  )
}

const mapStateToProps = (state) => ({
  isLoggedIn: state.authentication.signedIn,
  username: state.authentication.username
})

const mapDispatchToProps = (dispatch) => ({
  signOut: (username, password) => {
    axios({
      method: 'POST',
      url: 'https://hahaton.venturedevs.net/api/user/logout/',
      crossdomain: true,
      withCredentials: true,
      data: {},
    }).then((response) => {
      if (response.status === 200) {
        dispatch(signOut(response.data))
      } else {
        console.error(response.status)
      }
    })
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Header)
