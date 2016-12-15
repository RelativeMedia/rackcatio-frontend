/**
 * Created by mhdevita on 12/14/16.
 */

import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

const { object, element } = PropTypes;
class CoreLayout extends Component {
  static contextTypes = {
    store: object
  }

  componentDidMount () {
    const { dispatch } = this.context.store;
  }

  render() {
    const { children } = this.props;
    return ( <div className="CoreLayout">
      <div className="container">
        {children}
      </div>
    </div>);
  }
}

CoreLayout.propTypes = {
  children: element.isRequired,
  data: object.isRequired
};

const mapStateToProps = (state) => ({
  data: state.data
});
export default connect(mapStateToProps)(CoreLayout);
