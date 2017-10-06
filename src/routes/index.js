import React from 'react'
import { Route } from 'react-router'

import AppLayout from '../components/AppLayout'
import SignIn from '../components/SignIn'
import Register from '../components/Register'
import Rooms from '../components/Rooms'
import TicTacToeField from '../components/TicTacToeField'
import Profile from '../components/Profile'

export default (
  <Route path='/' component={AppLayout}>
    <Route path='/login' component={SignIn} />
    <Route path='/register' component={Register} />
    <Route path='/rooms' component={Rooms} />
    <Route path='/rooms/:id' component={TicTacToeField} />
    <Route path='/profile' component={Profile} />
  </Route>
)
