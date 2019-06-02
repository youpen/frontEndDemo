import React from 'react'
import { ListingItem } from '../listingScreen/listingItem'
import PropTypes from 'prop-types'

export class VirtualizedList extends React.Component {

  static defaultProps = {
    itemHeight: 60,
    bufferSize: 3,
  }

  constructor (props) {
    super(props)

    this.state = {
      startOffset: 0,
      endOffset: 0,
      visibleData: []
    }
    this.itemHeight = props.itemHeight
    this.bufferSize = props.bufferSize

    this.startIndex = 0
    this.endIndex = 0
    this.scrollTop = 0 // scrollContent顶部距离可视区顶部距离
    this.visibleCount = 0 // 可渲染的元素个数
    this.doc = window.document.body.scrollTop ? window.document.body : window.document.documentElement

    this.cachedNode = []
    this.currentItem = {
      index: 0,
      top: 0,
      bottom: 0
    }

    this.allContentHeight = 0;

    this.handleScroll = this.handleScroll.bind(this)
    this.calculateBoundary = this.calculateBoundary.bind(this)
    this.cacheItemPosition = this.cacheItemPosition.bind(this)
  }

  // 更新视图和数据
  updateVisibleData (data = this.props.data) {
    const visibleData = data.slice(this.startIndex, this.endIndex)

    this.setState({
      visibleData,
      startOffset: this.currentItem.top,
      endOffset: (this.props.data.length - this.endIndex) * this.itemHeight
    })
  }

  cacheItemPosition (dom, index) {
    if (!dom) return
    const rect = dom.getBoundingClientRect()
    const top = rect.top + window.pageYOffset
    this.cachedNode.push({
      top,
      bottom: top + this.itemHeight,
      index,
    })
  }

  componentWillReceiveProps (nextProps, nextContext) {
    if (nextProps.data.length !== this.props.data.length) {
      this.updateVisibleData(nextProps.data)
      this.allContentHeight = nextProps.data.length * this.itemHeight
    }
  }

  componentDidMount () {
    // 计算可渲染元素个数
    this.visibleCount = Math.ceil(window.innerHeight / this.itemHeight) + this.bufferSize
    this.endIndex = this.startIndex + this.visibleCount
    this.updateVisibleData()
    window.addEventListener('scroll', this.handleScroll, false)
  }

  calculateBoundary (scrollTop) {
    scrollTop = scrollTop || 0
    const currentItem = this.cachedNode.find(item => item.bottom >= scrollTop)
    if (!currentItem) {
      return
    }
    this.currentItem = currentItem
    this.startIndex = this.currentItem.index
    this.endIndex = this.startIndex + this.visibleCount
  }

  handleScroll (e) {
    const scrollTop = this.doc.scrollTop
    // 用户向下滚动，即内容向上滚动
    if (scrollTop > this.scrollTop) {
      if (scrollTop > this.currentItem.top) {
        this.calculateBoundary(scrollTop)
        this.updateVisibleData()
      }
      // 用户向上滚动，即内容向下滚动
    } else if (scrollTop < this.scrollTop) {
      if (scrollTop < this.currentItem.bottom) {
        this.calculateBoundary(scrollTop)
        this.updateVisibleData()
      }
    }

    this.scrollTop = scrollTop
    if (this.scrollTop > (this.allContentHeight - (this.itemHeight * this.visibleCount))) {
      this.props.onEndReach();
    }
  }

  render () {
    const { startOffset, endOffset } = this.state
    // TODO 向上滚动容易留白，需要模拟滚动效果，尝试动态控制startOffset的补正，尝试缓冲曲线
    return (
      <div
        style={{ paddingTop: startOffset, paddingBottom: endOffset }}
      >
        {
          this.state.visibleData.map((item, index) => {
            return (
              <ItemWrapper
                data={item}
                cacheItemPosition={this.cacheItemPosition}
                key={this.startIndex + index}
                index={this.startIndex + index}
                renderItem={this.props.renderItem}
              />
            )
          })
        }
      </div>
    )
  }

}

class ItemWrapper extends React.Component {
  componentDidMount () {
    this.props.cacheItemPosition(this.node, this.props.index)
  }

  render () {
    return (
      <div ref={(node) => { this.node = node }}>
        {this.props.renderItem(this.props.data)}
      </div>
    )
  }
}

VirtualizedList.propsTypes = {
  itemHeight: PropTypes.number,
  bufferSize: PropTypes.number,
  data: PropTypes.array.isRequired,
  renderItem: PropTypes.func.isRequired,
}