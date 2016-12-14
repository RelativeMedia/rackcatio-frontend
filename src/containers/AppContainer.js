/**
 * Created by mhdevita on 12/14/16.
 */

import React, { PropTypes, Component } from 'react';
import { Link, IndexLink } from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { actions as Data } from '../reducers/data';

const { object, element } = PropTypes;
class AppContainer extends Component {
  static contextTypes = {
    store: object
  }
  componentDidMount () {
    const { dispatch } = this.context.store;
    dispatch(Data.loadData());
  }
  render() {
    return (
      <div>
        <IndexLink to="/">Home</IndexLink>
        {' | '}
        <Link to="/fuel-savings">Demo App</Link>
        {' | '}
        <Link to="/about">About</Link>
        <br/>
        {this.props.children}
      </div>
    );
  }
}

AppContainer.propTypes = {
  children: element.isRequired,
  data: object.isRequired
};

const mapStateToProps = (state) => ({
  data: state.data
})
export default connect(mapStateToProps)(AppContainer);
