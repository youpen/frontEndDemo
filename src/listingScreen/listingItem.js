import React from 'react'
import moment from 'moment'
import styles from './listingItem.module.css'
import { screenMap } from '../routes/actions'
import { ReactComponent as TimeLogo } from '../assets/svgs/info-outline.svg'
import { ReactComponent as LikeLogo } from '../assets/svgs/like.svg'
import { ReactComponent as LikeOutlineLogo } from '../assets/svgs/like-outline.svg'
import { ReactComponent as CheckOutlineLogo } from '../assets/svgs/check-outline.svg'
import { ReactComponent as CheckLogo } from '../assets/svgs/check.svg'

export class ListingItem extends React.Component {

  constructor (props) {
    super(props)
    this.renderDescription = this.renderDescription.bind(this)
    this.navDetailScreen = this.navDetailScreen.bind(this)
  }

  render () {
    const { data } = this.props
    const { channel, creator, begin_time, end_time, description } = data
    return (
      <div className={styles.listingItemWrapper}>
        {this.renderUser(channel, creator)}
        <div className={styles.infoWrapper}>
          <div className={styles.leftWrapper}>
            <div className={styles.title}>{data.name}</div>
            {this.renderDate(begin_time, end_time)}
          </div>
          { data.images[0] && (
            <div className={styles.previewWrapper}>
              <img className={styles.preview} src={data.images[0]} alt=""/>
            </div>
          ) }
        </div>
        {this.renderDescription(description)}
        {this.renderActions()}
        {this.renderBorder()}
      </div>
    )
  }

  renderUser (channel, creator) {
    return (
      <div className={styles.userInfo}>
        <div className={styles.avatarWrapper}>
          <img className={styles.avatar} src={creator.avatar} alt=""/>
          {creator.username}
        </div>
        <div className={styles.channelWrapper}>
          <div className={styles.channel}>{channel.name}</div>
        </div>
      </div>
    )
  }

  renderDate (begin_time, end_time) {
    return (
      <div className={styles.dateWrapper}>
        <TimeLogo className={styles.TimeLogo} fill='#8560A9' />
        <div className={styles.date}>{moment(begin_time).format('DD MMM YYYY HH:MM')}</div>
        <div className={styles.date}>{moment(end_time).format('DD MMM YYYY HH:MM')}</div>
      </div>
    )
  }

  renderDescription (description) {
    return (
      <div className={styles.contentWrapper}
           onClick={this.navDetailScreen}>
        <div className={styles.content}>{description.slice(0, 165)}</div>
      </div>
    )
  }

  goingStyle = {
    Logo:<CheckLogo className={styles.logo} fill='#AECB4F' />,
    text:'I am going!',
  }
  notGoingStyle = {
    Logo:<CheckOutlineLogo className={styles.logo} fill='#AC8EC9' />,
    text: 'Going'
  }
  notLikeStyle = {
    Logo:<LikeOutlineLogo className={styles.logo} fill='#AC8EC9' />,
    text: 'Likes'
  }
  likeStyle = {
    Logo:<LikeLogo className={styles.logo} fill='#FF5C5C' />,
    text: 'I like it'
  }
  renderActions () {
    const { me_likes, me_going } = this.props.data;
    let currentGoingStyle = me_going ? this.goingStyle : this.notGoingStyle;
    let currentLikeStyle = me_likes ? this.likeStyle : this.notLikeStyle;
    return (
      <div className={styles.actionsWrapper}>
        <div className={styles.action}>
          { currentGoingStyle.Logo }
          { currentGoingStyle.text }
        </div>
        <div className={styles.action}>
          { currentLikeStyle.Logo }
          { currentLikeStyle.text }
        </div>
      </div>
    )
  }

  renderBorder () {
    return (
      <div className={styles.border}/>
    )
  }

  navDetailScreen () {
    this.props.setCurrentDetailPage({
      currentEvent: this.props.data
    })
    this.props.setCurrentScreen({
      currentScreen: screenMap.listDetailScreen
    })

  }

}