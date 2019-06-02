import React from 'react';
import { connect } from 'react-redux'

import LoginScreen from '../loginScreen/loginScreen';
import ListingScreen from '../listingScreen/listingScreen';
import ListDetailScreen from '../listDetailScreen/listDetailScreen';
import styles from '../root.css';
import { screenMap } from './actions'

function Route(props) {
  console.log('x', props.crtScreen)
  return (
      <div className={styles.App} >
        { props.crtScreen === screenMap.loginScreen && <LoginScreen /> }
        { props.crtScreen=== screenMap.listingScreen && <ListingScreen /> }
        { props.crtScreen=== screenMap.listDetailScreen && <ListDetailScreen /> }
      </div>
  );
}

const mapStateToProps = (state) => {
  return {
    crtScreen: state.route.currentScreen
  }
}

const mapDispatchToProps = dispatch => {
  return {}
}


export default connect(mapStateToProps, mapDispatchToProps)(Route);
