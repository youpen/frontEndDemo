import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { loginActionCreator } from './actions'
import * as userAPI from '../API/UserAuthentication'
import { ReactComponent as Logo } from '../assets/svgs/logo-cat.svg'
import { ReactComponent as Password } from '../assets/svgs/password.svg'
import { ReactComponent as User } from '../assets/svgs/user.svg'
import styles from './loginScreen.module.css'
import LikesOrGoing from '../components/likesOrGoing/'
import { a } from '../components/likesOrGoing/__mockParticipants__'
class LoginScreen extends React.Component {

  constructor () {
    super()

    this.onInputUsername = this.onInputUsername.bind(this)
    this.onInputPassword = this.onInputPassword.bind(this)
    this.submit = this.submit.bind(this)

    this.state = {
      username: '',
      password: '',
    }
  }

  render () {
    return (
      <div className={styles.loginScreenWrapper}>
        <div className={styles.background}>
          <div className={styles.inputWrapper}>
            <LikesOrGoing data={a} />
            {this.renderTitle()}
            {this.renderLogo()}
            {this.renderInput()}
          </div>
        </div>
        <button
          className={styles.signInButton}
          onClick={this.submit}
        >
          SIGN IN
        </button>
      </div>
    )
  }

  renderTitle () {
    return (
      <div className={styles.title}>
        <div className={styles.firstTitle}>FIND THE MOST LOVED ACTIVITIES</div>
        <div className={styles.secondTitle}>BLACK CAT</div>
      </div>
    )
  }

  renderLogo () {
    return (
      <div className={styles.logo}>
        <Logo fill='#D5EF7F'/>
      </div>
    )
  }

  renderInput () {
    return (
      <div className={styles.inputB}>
        <div className={styles.userName}>
          <div className={styles.tips}>
            <Password fill='#D3C1E5'/>
          </div>
          <input
            className={styles.inputA}
            type="text"
            value={this.state.username}
            onChange={this.onInputUsername}/>
        </div>
        <div className={styles.password}>
          <div className={styles.tips}>
            <User fill='#D3C1E5'/>
          </div>
          <input className={styles.inputA} type="password" value={this.state.password} onChange={this.onInputPassword}/>
        </div>
      </div>
    )
  }

  onInputUsername (event) {
    this.setState({
      username: event.target.value,
    })
  }

  onInputPassword (event) {
    this.setState({
      password: event.target.value,
    })
  }

  submit () {
    const data = {
      username: this.state.username,
      password: this.state.password
    }
    this.props.login(data)
  }

}

const mapStateToProps = () => {
  return {}
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    login: loginActionCreator
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)