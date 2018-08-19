import React, { Component } from 'react'
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { deleteEducation } from './../../actions/profileAction';
import PropTypes from 'prop-types';
class Education extends Component {
  onDeleteClick(id) {
    this.props.deleteEducation(id);
  }
  render() {
    let values = this.props.education.map((value, index) => {
      return (
        <tr key={index}>
          <td>{value.school}</td>
          <td>{value.degree}</td>
          <td ><Moment format="YYYY/MM/DD">
            {value.from}
          </Moment> - {value.to === null ? ('Now') : (<Moment format="YYYY/MM/DD">{value.to}</Moment>)}</td>
          <td><button className="btn btn-danger" onClick={this.onDeleteClick.bind(this, value._id)}>Delete</button></td>
        </tr>
      )
    })
    return (
      <div>
        <h4 className="mb-2">Education Credentials</h4>
        <table className="table">
          <thead className="thead-inverse">
            <tr>
              <th style={{ width: '25%' }}>School</th>
              <th>Degree</th>
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
Education.propTypes = {
  deleteEducation: PropTypes.func.isRequired,
}
export default connect(null, { deleteEducation })(Education);