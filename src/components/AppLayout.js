import React from 'react'
import { connect } from 'react-redux'
import Header from './Header'
import SignIn from './SignIn'

const AppLayout = ({ children, isLoggedIn }) => {
  if(isLoggedIn) {
    return (
      <div>
        <Header />
        {children}
      </div>
    )
  }
  return <SignIn />
}

const mapStateToProps = (state) => ({
  isLoggedIn: state.authentication.signedIn
})

export default connect(mapStateToProps)(AppLayout)
