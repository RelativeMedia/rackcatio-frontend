/**
 * Created by mhdevita on 12/14/2016.
 */
import React, { PropTypes } from 'react';

const { object, element } = PropTypes;
const HeaderComponent = (props) => (<div className="HeaderComponent">
  <Navigation />
</div>);

HeaderComponent.propTypes = {

}

export default HeaderComponent;
