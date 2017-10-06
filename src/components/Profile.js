import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router'

class Profile extends Component {
  constructor (props) {
    super(props)
    this.state = {
      me: {},
    }
  }
  fetchMe = () => {
    return axios({
      method: 'GET',
      url: 'https://hahaton.venturedevs.net/api/user/me/',
      crossdomain: true,
      withCredentials: true,
    })
  }
  componentDidMount () {
    this.fetchMe().then(response => {
      if (response.status === 200) {
        this.setState({me: response.data})
      } else {
        console.error(response.status)
      }
    })
  }
  render () {
    return (
      <div>
        <h1>Your profile stats</h1>
        Won: {this.state.me.won} <br />
        Lost: {this.state.me.lost} <br />
        Won by surrender: {this.state.me.won_by_surrender} <br />
        Draws: {this.state.me.draws} <br />
        Surrendered: {this.state.me.surrendered} <br />

        <Link to="/rooms">
          <button className="btn btn-outline-primary">
            Go to app
          </button>
        </Link>
      </div>
    )
  }
}

export default Profile
