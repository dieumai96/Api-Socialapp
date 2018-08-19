import React, { Component } from 'react'
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { deleteExperience } from './../../actions/profileAction';
import PropTypes from 'prop-types';
class Experience extends Component {
  onDeleteClick(id){
    this.props.deleteExperience(id);
  }
  render() {
    
    let values = this.props.experience.map((value, index) => {
      return (
        <tr key = {index}>
          <td>{value.company}</td>
          <td>{value.title}</td>
          <td ><Moment format="YYYY/MM/DD">
            {value.from}
          </Moment> - {value.to === null ? ('Now') : (<Moment format="YYYY/MM/DD">{value.to}</Moment>)}</td>
          <td><button className="btn btn-danger" onClick={this.onDeleteClick.bind(this, value._id)}>Delete</button></td>
        </tr>
      )
    })
    return (
      <div>
        <h4 className="mb-2">Experience Credentials</h4>
        <table className="table">
          <thead className="thead-inverse">
            <tr>
              <th style={{ width: '25%' }}>Company</th>
              <th>Title</th>
              <th>Years</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {values}
          </tbody>
        </table>
      </div>
    )
  }
}
Experience.propTypes = {
    deleteExperience : PropTypes.func.isRequired,
}
export default connect(null, {deleteExperience})(withRouter(Experience));