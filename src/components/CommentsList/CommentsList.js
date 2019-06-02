import React from 'react'
import styles from './CommentsList.module.css'
import { ReactComponent as ReplyLogo } from '../../assets/svgs/reply.svg'


export default class CommentsList extends React.Component {

  constructor (props) {
    super(props)
  }

  render () {
    console.log('xxx', this.props.data)
    const comments = this.props.data;
    return (
      <div className={styles.listWrapper}>
        {
          comments.map((item) => {
            return (
              <div className={styles.itemWrapper}>
                <div className={styles.avatarWrapper}>
                  <img className={styles.avatarImg} src={item.user.avatar} alt=""/>
                </div>
                <div className={styles.contentWrapper}>
                  <div className={styles.userWrapper}>
                    <div className={styles.username}>
                      {item.user.username}
                    </div>
                    <div className={styles.publicTime}>
                      {item.create_time}
                    </div>
                  </div>
                  <div className={styles.commentWrapper}>
                    {item.comment}
                  </div>
                </div>
                <div className={styles.replyWrapper}>
                  <ReplyLogo className={styles.replyLogo} fill='#D5EF7F' />
                </div>
              </div>
            )
          })
        }
      </div>
    )
  }

}

