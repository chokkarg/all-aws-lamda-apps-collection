import React, { Component } from 'react'
import {
  Link,
  withRouter,
} from 'react-router-dom'
import Loading from '../../fragments/Loading'
import styles from './Survey.module.css'
import { submitSurvey } from '../../utils'


class Survey extends Component {

  constructor(props) {
    super(props)

    const pathName = window.location.pathname.replace('/', '')

    this.state = {}
    this.state.state = pathName
    this.state.loading = true
    this.state.error = null
    this.state.formName = ''
    this.state.formEmail = ''
    this.state.formPhoneno = ''
  

    // Bindings
    this.handleFormInput = this.handleFormInput.bind(this)
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
    //this.handleFormTypeChange = this.handleFormTypeChange.bind(this)
  }

  /**
   * Component did mount
   */
  componentDidMount() {
    this.setState({
      loading: false
    })

    // Clear query params
    const url = document.location.href
    window.history.pushState({}, '', url.split('?')[0])
  }

  /**
   * Handles a form change
   */
  // handleFormTypeChange(type) {
  //   this.setState({ state: type },
  //     () => {
  //       this.props.history.push(`/${type}`)
  //     })
  // }

  /**
   * Handle text changes within form fields
   */
  handleFormInput(field, value) {
    value = value.trim()

    const nextState = {}
    nextState[field] = value

    this.setState(Object.assign(this.state, nextState))
  }

  /**
   * Handles form submission
   * @param {object} evt 
   */
  async handleFormSubmit(evt) {
    evt.preventDefault()

    this.setState({ loading: true })

    // Validate email
    if (!this.state.formEmail) {
      return this.setState({
        loading: false,
        formError: 'email is required'
      })
    }

    // Validate name
    if (!this.state.formName) {
      return this.setState({
        loading: false,
        formError: 'name is required'
      })
    }

    // Validate phoneno
    if (!this.state.formPhoneno) {
      return this.setState({
        loading: false,
        formError: 'Phone no is required'
      })
    }

    let message
    try {
      message = await submitSurvey(this.state.formName,this.state.formEmail, this.state.formPhoneno)
    } catch (error) {
      console.log("Message",message)
      if (error.message) {
        this.setState({
          formError: error.message,
          loading: false
        })
      } else {
        this.setState({
          formError: message +" Please try again",
          loading: false
        })
      }
      return
    }

    // Fetch user record and set session in cookie
    // let user = await userGet(token.token)
    // user = user.user
    // saveSession(user.id, user.email, token.token)

    this.props.history.push('/thank-you')
  }

  render() {

    return (
      <div className={`${styles.container} animateFadeIn`}>
        <div className={styles.containerInner}>

          { /* Logo */}

          {/* <Link to='/' className={`${styles.logo}`}>
            <img
              draggable='false'
              src={'./fullstack-app-title.png'}
              alt='serverless-fullstack-application'
            />
          </Link> */}

          { /* Loading */}

          {this.state.loading && (
            <div>
              {< Loading className={styles.containerLoading} />}
            </div>
          )}

          { /* Survey Form */}

          {/* {!this.state.loading && (
            <div className={styles.formType}>
              <div
                className={
                  `${styles.formTypeSurvey} 
                ${this.state.state === 'register' ? styles.formTypeActive : ''}`}
                onClick={(e) => { this.handleFormTypeChange('register') }}>
                Register
              </div>
              <div
                className={
                  `${styles.formTypeSignIn} 
                ${this.state.state === 'login' ? styles.formTypeActive : ''}`}
                onClick={(e) => { this.handleFormTypeChange('login') }}>
                Sign-In
              </div>
            </div>
          )} */}

          {!this.state.loading && (
            <div className={styles.containerSurvey}>

              <form className={styles.form} onSubmit={this.handleFormSubmit}>
                <div className={styles.formField}>
                  <label className={styles.formLabel}>Name</label>
                  <input
                    type='text'
                    placeholder='First Name  Last Name'
                    className={styles.formInput}
                    value={this.state.formName}
                    onChange={(e) => { this.handleFormInput('formName', e.target.value) }}
                  />
                </div>
                <div className={styles.formField}>
                  <label className={styles.formLabel}>Email</label>
                  <input
                    type='text'
                    placeholder='your-email@domain.com'
                    className={styles.formInput}
                    value={this.state.formEmail}
                    onChange={(e) => { this.handleFormInput('formEmail', e.target.value) }}
                  />
                </div>
                <div className={styles.formField}>
                  <label className={styles.formLabel}>Phone No</label>
                  <input
                    type='text'
                    placeholder='your phone no.'
                    className={styles.formInput}
                    value={this.state.formPhoneno}
                    onChange={(e) => { this.handleFormInput('formPhoneno', e.target.value) }}
                  />
                </div>

                {this.state.formError && (
                  <div className={styles.formError}>{this.state.formError}</div>
                )}

                <input
                  className={`buttonPrimaryLarge ${styles.formButton}`}
                  type='submit'
                  value='Submit'
                />

              </form>
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default withRouter(Survey)