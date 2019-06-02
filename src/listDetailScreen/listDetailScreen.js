import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import moment from 'moment'

import { fetchCommentsCreator, fetchParticipantsCreator } from '../listingScreen/actions'
import CommentInput from '../components/CommentInput/CommentInput'
import CommentsList from '../components/CommentsList/CommentsList'
import LikesOrGoing from '../components/likesOrGoing'
import styles from './listDetailScreen.module.css'
import { ReactComponent as Logo } from '../assets/svgs/logo-cat.svg'
import { ReactComponent as Home } from '../assets/svgs/home.svg'
import { ReactComponent as CommentLogo } from '../assets/svgs/comment-outline.svg'
import { ReactComponent as InfoLogo } from '../assets/svgs/info.svg'
import { ReactComponent as PeopleLogo } from '../assets/svgs/people-outline.svg'
import { ReactComponent as DateFromLogo } from '../assets/svgs/date-from.svg'
import { ReactComponent as DateToLogo } from '../assets/svgs/date-to.svg'
import images from '../assets/images'
import { setCurrentScreenCreator } from '../routes/actions'

const detail = 'Detail'
const participants = 'Participants'
const comments = 'Comments'

class ListDetailScreen extends React.Component {

  constructor (props) {
    super(props)

    this.state = {
      hideDescription: true,
      currentTab: detail,
    }

    this.renderContent = this.renderContent.bind(this)
    this.showAllDescription = this.showAllDescription.bind(this)
    this.renderUser = this.renderUser.bind(this)
    this.selectTab = this.selectTab.bind(this)
    this.navHome = this.navHome.bind(this)
  }

  componentDidMount () {
    this.props.fetchComments()
    this.props.fetchParticipants()
  }

  render () {
    const { currentTab } = this.state;
    // TODO 改用display:none交给浏览器处理
    let commentsData = this.props.comments;
    if (currentTab === detail) {
      commentsData = commentsData.slice(0,5)
    }
    return (
      <div className={styles.listDetailWrapper}>
        {this.renderBar()}
        {this.renderHeader()}
        {currentTab === detail && this.renderContent()}
        {currentTab === detail && this.renderDateInfo()}
        {currentTab === detail && this.renderLocationInfo()}
        {currentTab !== comments && <LikesOrGoing type='likes' data={this.props.participants}/>}
        {currentTab !== comments && <LikesOrGoing type='going' data={this.props.participants}/>}
        <CommentsList data={commentsData}/>
        <CommentInput onConfirm={() => {}}/>

      </div>
    )
  }

  renderHeader() {
    const { name, channel, creator } = this.props.data
    return (
      <div className={styles.headerWrapper}>
        <div className={styles.channelWrapper}>
          <div className={styles.channel}>{channel.name}</div>
        </div>
        <div className={styles.titleWrapper}>
          <div className={styles.title}>
            {name}
          </div>
        </div>
        {this.renderUser(creator)}
        {this.renderTabs()}
      </div>
    )
  }

  renderUser (creator) {
    return (
      <div className={styles.userWrapper}>
        <div className={styles.avatar}>
          <img className={styles.avatarImg} src={creator.avatar} alt=""/>
        </div>
        <div className={styles.userInfo}>
          <div className={styles.userName}>{creator.username}</div>
          <div className={styles.publishDate}>Published 2 days ago</div>
        </div>
      </div>
    )
  }

  tabs = [
    { type: detail, logo: InfoLogo },
    { type: participants, logo: PeopleLogo },
    { type: comments, logo: CommentLogo }
  ]

  renderTabs () {
    const currentTab = this.state.currentTab
    return (
      <div className={styles.tabWrapper}>
        {
          this.tabs.map((item) => {
            const Logo = item.logo
            let wrapperStyle = styles.detailTabWrapper
            let fill = '#BABABA'
            if (currentTab === item.type) {
              wrapperStyle = `${styles.detailTabWrapper} ${styles.selectedTab}`
              fill = '#AECB4F'
            }
            return (
              <div className={wrapperStyle} onClick={() => this.selectTab(item.type)}>
                <Logo className={styles.InfoLogo} fill={fill}/>
                {item.type}
              </div>
            )
          })
        }
      </div>
    )
  }

  selectTab (type) {
    this.setState({
      currentTab: type
    })
  }

  // TODO 删除多余结构
  renderContent () {
    const { images, description } = this.props.data
    const { hideDescription } = this.state
    let contentWrapperStyle = styles.contentWrapper
    let contentDescriptionWrapperStyle = `${styles.contentDescriptionWrapper}`
    if (hideDescription) {
      contentWrapperStyle = `${styles.contentWrapper} ${styles.contentWrapperHeight}`
      contentDescriptionWrapperStyle = `${styles.contentDescriptionWrapper} ${styles.contentDescriptionWrapperHeight}`
    }
    return (
      <div className={contentWrapperStyle}>
        {
          images.length !== 0 && <div className={styles.contentImageWrapper}>
            {
              images.map((item) => {
                return (
                  <div className={styles.imagesWrapper}>
                    <img className={styles.image} src={item} alt=""/>
                  </div>
                )
              })
            }
          </div>
        }
        <div className={contentDescriptionWrapperStyle}>
          {description}
          {
            hideDescription && <div className={styles.descriptionMask}/>
          }
          {
            hideDescription && <button
              className={styles.viewAllButton}
              onClick={this.showAllDescription}
            >
              VIEW ALL
            </button>
          }
        </div>
      </div>
    )
  }

  showAllDescription () {
    console.log('xjkjk')
    this.setState({
      hideDescription: false
    })
  }

  renderBar () {
    return (
      <div className={styles.listingHeader}>
        <div className={styles.searchLogoWrapper} onClick={this.navHome}>
          <Home fill='#AECB4F' className={styles.homeLogo}/>
        </div>
        <div className={styles.logoWrapper}>
          <Logo className={styles.logo} fill='#D5EF7F'/>
        </div>
        <div className={styles.avatarWrapper}>

        </div>
      </div>
    )
  }

  navHome() {
    this.props.setCurrentScreen({currentScreen:'ListingScreen'})
  }

  renderDateInfo () {
    const { begin_time, end_time } = this.props.data
    return (
      <div className={styles.dateWrapper}>
        <div className={styles.when}>
          <div className={styles.verticalLine}/>
          When
        </div>
        <div className={styles.detailDateWrapper}>
          <div className={styles.detailDate}>
            <div className={styles.detailDateTop}>
              <DateFromLogo fill='#D5EF7F' className={styles.DateLogo}/>
              {moment(begin_time).format('DD MMMM YYYY')}
            </div>
            <div className={styles.hours}>
              8:30 am
            </div>
          </div>
          <div className={styles.verticalDivider}/>
          <div className={styles.detailDate}>
            <div className={styles.detailDateTop}>
              <DateToLogo fill='#D5EF7F' className={styles.DateLogo}/>
              {moment(end_time).format('DD MMMM YYYY')}
            </div>
            <div className={styles.hours}/>
          </div>
        </div>
      </div>
    )
  }

  renderLocationInfo () {
    const { location, location_detail } = this.props.data
    return (
      <div className={styles.locationWrapper}>
        <div className={styles.when}>
          <div className={styles.verticalLine}/>
          Where
        </div>
        <div>
          <div className={styles.locationDetail}>
            <div>{location}</div>
            <div>{location_detail}</div>
          </div>
          <img className={styles.gmap} src={images.gmap} alt=""/>
        </div>
      </div>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    data: state.events.currentEvent,
    comments: state.events.currentComments,
    participants: state.events.currentParticipants,
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    fetchComments: fetchCommentsCreator,
    fetchParticipants: fetchParticipantsCreator,
    setCurrentScreen: setCurrentScreenCreator
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ListDetailScreen)