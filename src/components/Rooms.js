import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router'
import { connect } from 'react-redux'

class Rooms extends Component {
  constructor(props) {
    super(props)
    this.state = {
      rooms: [],
      me: {}
    }
  }
  componentDidMount() {
    this.fetchRooms().then(response => {
      if (response.status === 200) {
        console.log(response)
        this.setState({ rooms: response.data })
      } else {
        console.error(response.status)
      }
    })
    this.fetchMe().then(response => {
      if (response.status === 200) {
        console.log(response)
        this.setState({ me: response.data })
      } else {
        console.error(response.status)
      }
    })
  }
  fetchRooms = () => {
    return axios({
      method: 'GET',
      url: 'https://hahaton.venturedevs.net/api/games/',
      crossdomain: true,
      withCredentials: true,
    })
  }
  createNewRoom = () => {
    axios({
      method: 'POST',
      url: 'https://hahaton.venturedevs.net/api/games/',
      crossdomain: true,
      withCredentials: true,
    }).then(() => {
      this.fetchRooms().then(response => {
        if (response.status === 200) {
          console.log(response)
          this.setState({ rooms: response.data })
        } else {
          console.error(response.status)
        }
      })
    })
  }
  joinGame = (roomId) => {
    return axios({
      method: 'POST',
      url: `https://hahaton.venturedevs.net/api/games/${roomId}/join/`,
      crossdomain: true,
      withCredentials: true,
    })
  }
  fetchMe = () => {
    return axios({
      method: 'GET',
      url: 'https://hahaton.venturedevs.net/api/user/me/',
      crossdomain: true,
      withCredentials: true,
    })
  }
  renderStatus(started, finished) {
    if(started) {
      if(finished) {
        return 'Game finished'
      }
      return 'Game is active'
    }
    return 'Game is waiting to start'
  }
  render() {
    return (
      <div className="container">
        <h1>Rooms</h1>
        <ul className="list-unstyled">
          {
            this.state.rooms.map((room) => (
              <li className="list-group-item" key={room.id}>
                Room ID: {room.id}, <br />
                Players in room: {room.players_count} <br />
                {
                  room.players_count === 1
                  ? 'Only ' + room.players[0].name + ' in game'
                  : 'Player ' + room.players[0].name + ' plays with ' + room.players[1].name
                } <br />
                {this.renderStatus(room.started, room.finished)} <br /> <br />
                {
                  (room.players[0].name === this.state.me.username ||
                    (room.players[1] && room.players[1].name === this.state.me.username))
                  ? <Link to={`rooms/${room.id}`}>
                    <button className="btn btn-primary">
                      Go back to the game
                    </button>
                  </Link>
                    : room.players_count === 1 &&
                    <Link to={`rooms/${room.id}`}>
                      <button className="btn btn-secondary" onClick={() => this.joinGame(room.id)}>
                        Join to the game!
                      </button>
                    </Link>
                }
              </li>
            ))
          }
        </ul>
        <div>
          <button className="btn btn-danger" onClick={this.createNewRoom}>
            Create new room
          </button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  username: state.authentication.username
})

export default connect(mapStateToProps)(Rooms)
