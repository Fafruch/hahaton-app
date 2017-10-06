import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { Link } from 'react-router'
import { signIn } from '../actions/authentication'

class SignIn extends Component {
  constructor(props) {
    super(props)
    this.state = {
      usernameInput: '',
      passwordInput: '',
    }
  }
  render() {
    return (
      <div className="container w-25">
        <h1>Login</h1>
        <form onSubmit={(e) => {
          e.preventDefault()
          this.props.signIn(this.state.usernameInput, this.state.passwordInput)
        }}>
          <input
            type="username"
            name="username"
            className="form-control"
            placeholder="Username"
            value={this.state.usernameInput}
            onChange={(e) => this.setState({ usernameInput: e.target.value })}
          />
          <input
            type="password"
            name="password"
            className="form-control"
            placeholder="Password"
            value={this.state.passwordInput}
            onChange={(e) => this.setState({ passwordInput: e.target.value })}
          />
          <button type="submit" className="btn btn-primary">
            SignIn
          </button>
          <div>
            No account?
            <Link to="/register/">
              Create one
            </Link>
            {
              this.props.isLoggedIn &&
                <div>
                  <br />
                  <br />
                  <Link to="/rooms">
                    <button className="btn btn-outline-primary">
                      Go to app
                    </button>
                  </Link>
                </div>
            }
          </div>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  isLoggedIn: state.authentication.signedIn
})

const mapDispatchToProps = (dispatch) => ({
  signIn: (username, password) => {
    axios({
      method: 'POST',
      url: 'https://hahaton.venturedevs.net/api/user/login/',
      crossdomain: true,
      withCredentials: true,
      data: { username, password },
    }).then((response) => {
      if (response.status === 200) {
        dispatch(signIn(response.data))
      } else {
        console.error(response.status)
      }
    })
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)
