import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router'
import { connect } from 'react-redux'

class TicTacToeField extends Component {
  constructor (props) {
    super(props)
    this.state = {
      game: { board: [], players: [] },
      me: {},
      setInternalIndex: 0
    }
  }
  fetchGame = () => {
    return axios({
      method: 'GET',
      url: `https://hahaton.venturedevs.net/api/games/${this.props.params.id}`,
      crossdomain: true,
      withCredentials: true,
    })
  }
  sendMove = (x, y) => {
    return axios({
      method: 'POST',
      url: `https://hahaton.venturedevs.net/api/games/${this.props.params.id}/moves/`,
      data: { x, y },
      crossdomain: true,
      withCredentials: true,
    })
  }
  startGame = () => {
    return axios({
      method: 'POST',
      url: `https://hahaton.venturedevs.net/api/games/${this.props.params.id}/start/`,
      data: {},
      crossdomain: true,
      withCredentials: true,
    })
  }
  leaveGame = () => {
    return axios({
      method: 'POST',
      url: `https://hahaton.venturedevs.net/api/games/${this.props.params.id}/leave/`,
      data: {},
      crossdomain: true,
      withCredentials: true,
    })
  }
  surrenderGame = () => {
    return axios({
      method: 'POST',
      url: `https://hahaton.venturedevs.net/api/games/${this.props.params.id}/surrender/`,
      data: {},
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
  componentDidMount () {
    this.fetchGame().then(response => {
      if (response.status === 200) {
        this.setState({game: response.data})
      } else {
        console.error(response.status)
      }
    })
    this.fetchMe().then(response => {
      if (response.status === 200) {
        this.setState({me: response.data})
      } else {
        console.error(response.status)
      }
    })
    this.setState({
      setInternalIndex: setInterval(() => this.fetchGame().then(response => {
        if (response.status === 200) {
          this.setState({ game: response.data})
        } else {
          console.error(response.status)
        }
      }), 1000)
    })
  }
  componentWillUnmount () {
    clearInterval(this.state.setInternalIndex)
  }
  render () {
    if(this.state.game.started) {
      return (
        <div>
          <table className='table table-bordered'>
            <tbody>
            {
              this.state.game.board.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {
                    row.map((cell, columnIndex) => (
                      <td
                        key={columnIndex}
                        onClick={() => this.sendMove(rowIndex, columnIndex)
                          .then(this.fetchGame)
                          .then(response => {
                            if (response.status === 200) {
                              this.setState({ game: response.data })
                            } else {
                              console.error(response.status)
                            }
                          })
                          .catch(error => {
                            if(error.response.status === 400) {
                              alert("Not your turn")
                            }
                          })
                        }
                      >
                        {cell}
                      </td>
                    ))
                  }
                </tr>
              ))
            }
            </tbody>
          </table>
          <br />
          <br />
          <button className="btn btn-danger" onClick={this.leaveGame}>
            Leave game
          </button>
          <br />
          <br />
          <button className="btn btn-outline-danger" onClick={this.surrenderGame}>
            Surrender game
          </button>
          <br />
          <br />
          <Link to="/rooms">
            Go back to all rooms
          </Link>
          <br />
        </div>
      )
    } else {
      if(this.state.game.players.length === 1
        && this.state.game.players[0]
        && this.state.game.players[0].name === this.props.username) {
        return (
          <div>
            Game is waiting for other players.
            <br />
            <Link to="/rooms">
              Go back to all rooms
            </Link>
          </div>
        )
      }
      return (
        <div>
          <button className="btn btn-primary" onClick={() => this.startGame().then(this.fetchGame).then(response => {
            if (response.status === 200) {
              this.setState({ game: response.data })
            } else {
              console.error(response.status)
            }
          })}>
            Start game
          </button>
          <br />
          <Link to="/rooms">
            Go back to all rooms
          </Link>
        </div>
      )
    }
  }
}

const mapStateToProps = (state) => ({
  username: state.authentication.username
})

export default connect(mapStateToProps)(TicTacToeField)
