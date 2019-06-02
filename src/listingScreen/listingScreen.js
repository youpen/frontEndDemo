import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import styles from './listingScreen.module.css'
import {
  eventsActionCreator,
  resetEventsActionCreator,
  setCurrentDetailPageCreator,
  setResetFilterCreator
} from './actions'
import { setCurrentScreenCreator } from '../routes/actions';
import { ListingItem } from './listingItem'
import { VirtualizedList } from '../components/VirtualizedList'
import SiderBar from './SideBar/sideBar'
import { ReactComponent as Logo } from '../assets/svgs/logo-cat.svg'
import { ReactComponent as SearchLogo } from '../assets/svgs/search.svg'

class ListingScreen extends React.Component {

  constructor (props) {
    super(props)
    this.searchDataByFilter = this.searchDataByFilter.bind(this);
    this.onEndReach = this.onEndReach.bind(this);
    this.showFilterBar = this.showFilterBar.bind(this);
    this.resetFilter = this.resetFilter.bind(this);
    this.renderItem = this.renderItem.bind(this);

    this.state = {
      showFilter: false
    }

    this.contentWrapperStyle = styles.contentWrapper;
    this.clickedSearch = false;
  }

  componentDidMount () {
    this.props.fetchEvents()
  }

  render () {

    if (this.clickedSearch) {
      if (this.state.showFilter) {
        this.contentWrapperStyle = `${styles.contentWrapper} ${styles.showFilterBarAnimate}`
      } else {
        this.contentWrapperStyle = `${styles.contentWrapper} ${styles.hideFilterBarAnimate}`
      }
    }
    return (
      <div className={this.contentWrapperStyle} ref={node => { this.node = node }}>
        <div className={styles.searchLayout}>
            <SiderBar
              searchDataByFilter={this.searchDataByFilter}
            />
        </div>
        <div className={styles.listingScreenWrapper}>
          {this.renderBar()}
          {(this.props.filterChannel || this.props.filterDate) && this.renderFilterBar()}
          <VirtualizedList
            data={this.props.eventsList}
            renderItem={this.renderItem}
            onEndReach={this.onEndReach}
            itemHeight={228}
          />
        </div>
      </div>
    )
  }

  onEndReach() {
    // 拉取更多数据
    this.props.fetchEvents({
      channel: this.props.filterChannel,
      date: this.props.filterDate,
      startIndex: this.props.eventsList.length
  });
  }

  renderFilterBar() {
    return (
      <div className={styles.filterBarWrapper}>
        <div className={styles.filterResult}>
          <div className={styles.resultCount}>
            {`${this.props.eventsList.length} Result`}
          </div>
          <div className={styles.clearButtonWrapper} >
            <button
              className={styles.clearButton}
              onClick={this.resetFilter}
            >CLEAR SEARCH</button>
          </div>
        </div>
        <div className={styles.filterDetail}>
          {`Searched for ${this.searchText}`}
        </div>
      </div>
    )
  }

  resetFilter() {
    this.props.resetFilter();
    this.props.fetchEvents()
  }

  searchDataByFilter (channel = {}, date, searchText) {
    this.searchText = searchText;
    this.showFilterBar();
    this.props.resetEvents();
    this.props.fetchEvents({ channel: channel.id, date })
  }

  renderBar () {
    return (
      <div className={styles.listingHeader}>
        <div
          className={styles.searchLogoWrapper}
          onClick={this.showFilterBar}
        >
          <SearchLogo className={styles.searchLogo}/>
        </div>
        <div className={styles.logoWrapper}>
          <Logo className={styles.logo} fill='#D5EF7F'/>
        </div>
        <div className={styles.avatarWrapper}>
          <img className={styles.personalAvatar} src="https://coding.net/static/fruit_avatar/Fruit-1.png" alt=""/>
        </div>
      </div>
    )
  }

  showFilterBar() {
    this.clickedSearch = true;
    this.setState({
      showFilter: !this.state.showFilter
    })
  }

  renderItem (item) {
    return (
      <ListingItem
        data={item}
        setCurrentScreen={this.props.setCurrentScreen}
        setCurrentDetailPage={this.props.setCurrentDetailPage}
      />
    )
  }

}

const mapStateToProps = (state) => {
  return {
    eventsList: state.events.events,
    filterDate: state.events.filterDate,
    filterChannel: state.events.filterChannel,
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    fetchEvents: eventsActionCreator,
    resetEvents: resetEventsActionCreator,
    setCurrentScreen: setCurrentScreenCreator,
    setCurrentDetailPage: setCurrentDetailPageCreator,
    resetFilter: setResetFilterCreator,
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ListingScreen)