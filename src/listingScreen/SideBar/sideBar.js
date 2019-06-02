import React from 'react'

import styles from './sideBar.module.css'
import moment from 'moment'
import {
  setDateFilterCreator,
  setChannelFilterCreator,
  setCurrentPageSizeCreator, fetchChannelsCreator
} from '../actions'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { ReactComponent as SearchLogo } from '../../assets/svgs/search.svg'

const ANYTIME = 'ANYTIME'
const TODAY = 'TODAY'
const TOMORROW = 'TOMORROW'
const THISWEEK = 'THIS WEEK'
const THISMONTH = 'THIS MONTH'
const LATER = 'LATER'

class SideBar extends React.Component {

  constructor () {
    super()
    this.dateFilters = [ANYTIME, TODAY, TOMORROW, THISWEEK, THISMONTH, LATER]

    this.state = {
      inputStartDate: undefined,
      inputEndDate: undefined
    }

    this.setInputStartDate = this.setInputStartDate.bind(this)
    this.setInputEndDate = this.setInputEndDate.bind(this)
    this.searchDataByFilter = this.searchDataByFilter.bind(this)
    this.convertDateTag2Time = this.convertDateTag2Time.bind(this)
  }

  componentDidMount () {
    this.props.fetchChannels()
  }

  render () {
    const { inputStartDate, inputEndDate} = this.state;
    const { filterChannel, channels } = this.props;
    let searchText = '';
    if (filterChannel) {
      searchText = `${filterChannel.name} activities`;
    }
    if (inputStartDate && inputEndDate) {
      searchText = `${searchText} from ${inputStartDate} to ${inputEndDate}`
    }
    this.searchText = searchText;
    return (
      <div className={styles.wrapper}>
        <div className={styles.filterWrapper}>
          <div className={styles.titleWrapper}>
            <div className={styles.title}>DATE</div>
          </div>
          <div className={styles.dateFilter}>
            {this.dateFilters.map(item => this.renderDateButton(item))}
          </div>
          <div className={styles.titleWrapper}>
            <div className={styles.title}>CHANNEL</div>
          </div>
          <div className={styles.channelFilter}>
            {channels && channels.map(item => this.renderChannelButton(item))}
          </div>
        </div>
        <button
          onClick={() => this.searchDataByFilter() }
          className={styles.searchButtonWrapper}
        >
          <div
            className={styles.searchWrapper}

          >
          <SearchLogo className={styles.searchLogo}/>
          SEARCH
          </div>
          <div>
            {searchText}
          </div>
        </button>
      </div>
    )
  }

  searchDataByFilter() {
    const dateFilter = this.convertDateTag2Time(this.props.filterDate);

    this.props.searchDataByFilter(
      this.props.filterChannel,
      dateFilter,
      this.searchText,
    )
  }

  convertDateTag2Time(selectDate) {
    const days = 'days'
    const week = 'week'
    const month = 'month'
    const now = moment().format('YYYY-MM-DD');
    // const yesterday = moment(today).subtract(1, days);
    const zero = moment(now).format('YYYY-MM-DD HH:mm:ss');
    const today = moment(zero).toDate().getTime();
    const tomorrow = moment(today).add(1, days).valueOf();
    switch (selectDate) {
      case TODAY :
        return {
          after: today,
          before: tomorrow,
        }
      case TOMORROW :
        const dayAfterTomorrow = moment(tomorrow).add(1, days).valueOf();
        return {
          after: tomorrow,
          before: dayAfterTomorrow,
        }
      case THISWEEK :
        const startOfWeek = moment().startOf(week).add(1, days).valueOf();
        const endOfWeek = moment().endOf(week).add(2, days).valueOf();
        return {
          after: startOfWeek,
          before: endOfWeek,
        }
      case THISMONTH :
        const startOfMonth = moment().startOf(month).valueOf();
        const endOfMonth = moment().endOf(month).add(1, days).valueOf();
        return {
          after: startOfMonth,
          before: endOfMonth,
        }
      default:
        return {
          after: undefined,
          before: undefined,
        }
    }
  }

  renderDateButton (date) {
    const { filterDate } = this.props;
    let style = styles.buttonWrapper
    if (date === filterDate) {
      style += ` ${styles.selectedButton}`
    }
    const showTimeSelector = filterDate === LATER && date === LATER
    if (!showTimeSelector) {
      return (
        <button
          className={style}
          onClick={() => this.setDate(date)}
        >
          {date}
        </button>
      )
    }

    return (
      <div>
        <button
          className={style}
          onClick={() => this.setDate(date)}
        >
          {date}
        </button>
        <div className={styles.bubble}>
          <div className={styles.inputWrapper}>
            <input
              className={styles.input}
              type="text" value={this.state.inputStartDate}
              onChange={this.setInputStartDate}
            />
          </div>
          <div className={styles.inputWrapper}>
            <input
              className={styles.input}
              type="text"
              value={this.state.inputEndDate}
              onChange={this.setInputEndDate}
            />
          </div>
        </div>
      </div>
    )
  }

  setDate(date) {
    console.log(date)
    if (date === LATER) {
      this.setState({
        inputStartDate: moment().format('MM/DD'),
        inputEndDate: moment().format('MM/DD'),
      });
      this.props.setDateFilter({ filterDate: date })
      return;
    }
    this.props.setDateFilter({ filterDate: date })
    let { after, before } = this.convertDateTag2Time(date);

    const inputStartDate = after ? moment(after).format('MM/DD') : undefined;
    const inputEndDate = before ? moment(before).format('MM/DD') : undefined
    this.setState({
      inputStartDate,
      inputEndDate
    })
  }

  setInputStartDate (e) {
    this.setState({
      inputStartDate: e.target.value,
    })
  }

  setInputEndDate (e) {
    this.setState({
      inputEndDate: e.target.value,
    })
  }

  renderChannelButton (channel) {
    let style = `${styles.buttonWrapper} ${styles.channelButtonBorder}`
    if (channel === this.props.filterChannel) {
      style += ` ${styles.selectedButton}`
    }
    return (
      <button
        className={style}
        onClick={() => {
          this.props.setChannelFilter({ filterChannel: channel })
        }}
      >
        {channel.name}
      </button>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    filterDate: state.events.filterDate,
    filterChannel: state.events.filterChannel,
    inputStartDate: undefined,
    inputEndDate: undefined,
    channels: state.events.channels
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    setDateFilter: setDateFilterCreator,
    setChannelFilter: setChannelFilterCreator,
    fetchChannels: fetchChannelsCreator,
    // setCurrentPageSizeCreator,
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(SideBar)