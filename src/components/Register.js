import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { register } from '../actions/authentication'

class Register extends Component {
  constructor(props) {
    super(props)
    this.state = {
      usernameInput: '',
      passwordInput: '',
    }
  }
  render() {
    return (
      <div>
        <h1>Create new user</h1>
        <form onSubmit={(e) => {
          e.preventDefault()
          this.props.register(this.state.usernameInput, this.state.passwordInput)
        }}>
          <input
            type="username"
            name="username"
            className="input-group"
            placeholder="Username"
            value={this.state.usernameInput}
            onChange={(e) => this.setState({ usernameInput: e.target.value })}
          />
          <input
            type="password"
            name="password"
            className="input-group"
            placeholder="Password"
            value={this.state.passwordInput}
            onChange={(e) => this.setState({ passwordInput: e.target.value })}
          />
          <button type="submit" className="btn btn-primary">
            Register
          </button>
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  register: (username, password) => {
    axios({
      method: 'POST',
      url: 'https://hahaton.venturedevs.net/api/user/register/',
      crossdomain: true,
      withCredentials: true,
      data: { username, password },
    }).then((response) => {
      if (response.status === 201) {
        dispatch(register(response.data))
      } else {
        console.error(response.status)
      }
    })
  }
})

export default connect(null, mapDispatchToProps)(Register)
