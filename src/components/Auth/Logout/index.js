/**
 * Created by mhdevita on 12/14/2016.
 */
import React, { PropTypes, Component } from 'react';

const { object, element } = PropTypes;
const LogoutComponent = (props) => (<div className="LogoutComponent">
  <div className="row">
    <form className="form">
      <div className="form-group">
        <input
          type="text"
          placeholder="username or email"
          className="form-control input-lg" />
      </div>
      <div className="form-group">
        <input
          type="password"
          placeholder="password"
          className="form-control input-lg" />
      </div>
    </form>
  </div>
</div>);

LogoutComponent.propTypes = {

}

export default LogoutComponent;
