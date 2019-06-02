import React from 'react'
import styles from './CommentInput.module.css'
import { ReactComponent as CrossLogo } from '../../assets/svgs/cross.svg'
import { ReactComponent as SendLogo } from '../../assets/svgs/send.svg'


export default class CommentInput extends React.Component {

  constructor (props) {
    super(props)

    this.state = {
      input: ''
    }

    this.onInput = this.onInput.bind(this);
    this.onConfirm = this.onConfirm.bind(this);
  }

  render () {
    return (
      <div
        className={styles.wrapper}
      >
        <div className={styles.inputWrapper}>
            <CrossLogo className={styles.crossLogo} />
            <input
              className={styles.input} type="text"
              onChange={this.onInput}
            />
        </div>
        <div className={styles.confirmWrapper} onClick={this.onConfirm}>
          <SendLogo className={styles.sendLogo} />
        </div>
      </div>
    )
  }

  onInput(e) {
    this.setState({
      input: e.target.value,
    })
  }

  onConfirm() {
    if (this.props.onConfirm) {
      this.props.onConfirm(this.state.input)
    }
  }

}

