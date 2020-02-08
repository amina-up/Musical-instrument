import React from 'react';
import { connect } from 'react-redux';
import { Alert } from 'reactstrap';

const AlertMsg = props =>
  props.alerts !== null &&
  props.alerts.length > 0 &&
  props.alerts.map(alert => (
    <Alert key={alert.id} color={alert.alertType}>
      {alert.msg}
    </Alert>
  ));

const mapStateToProps = state => ({
  alerts: state.alertReducer
});

export default connect(mapStateToProps)(AlertMsg);
