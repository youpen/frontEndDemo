import React from 'react'
import styles from './likesOrGoing.module.css'
import { ReactComponent as CheckLogo } from '../../assets/svgs/check-outline.svg'
import { ReactComponent as LikeLogo } from '../../assets/svgs/like-outline.svg'
import { a } from './__mockParticipants__'

export default class LikesOrGoing extends React.Component {

  constructor (props) {
    super(props)
    console.log(props.type)
    this.isLikes = props.type === 'likes';
    if (this.isLikes) {
      this.text = 'likes'
    } else {
      this.text = 'going'
    }
  }

  componentDidMount () {

  }

  render () {
    const data = this.props.data;
    console.warn(data)
    return (
      <div className={styles.wrapper}>
        <div className={styles.countWrapper}>
          {
            this.isLikes ? <CheckLogo className={styles.checkLogo} fill='#AC8EC9' /> : <LikeLogo className={styles.checkLogo} fill="#AC8EC9"/>
          }
          <div>{data && data.length}</div>
          <div>{`${this.text}`}</div>
        </div>
        <div className={styles.avatarListWrapper}>
          {
            data && data.map((item) => {
              return (
                <div className={styles.itemWrapper}>
                  <img className={styles.avatar} src={item.avatar} alt=""/>
                </div>
              )
            })
          }
        </div>
      </div>
    )
  }

}

