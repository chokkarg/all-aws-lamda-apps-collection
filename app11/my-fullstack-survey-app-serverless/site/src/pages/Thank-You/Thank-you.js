import React, { Component } from 'react'
import { 
  withRouter 
} from 'react-router-dom'
import styles from './Thank-you.module.css'
// import {
//   getSession,
//   deleteSession 
// } from '../../utils'

class ThankYou extends Component {

  constructor(props) {
    super(props)
    this.state = {}

    // Bindings
   // this.logout = this.logout.bind(this)
  }

  async componentDidMount() {

    // const userSession = getSession()

    // this.setState({
    //   session: userSession,
    // })
  }

  /**
   * Log user out by clearing cookie and redirecting
   */
  // logout() {
  //   deleteSession()
  //   this.props.history.push(`/`)
  // }

  render() {

    return (
      

          <div className={`${styles.contentContainer}`}>

            {/* <div className={`${styles.artwork} animateFlicker`}>
              <img 
                draggable='false'
                src={'./fullstack-app-artwork.png'} 
                alt='serverless-fullstack-application' 
              />
            </div> */}

            <div className={`${styles.welcomeMessage}`}>
              Thank you for taking the survey...
            </div>

          </div>

    )
  }
}

export default withRouter(ThankYou)