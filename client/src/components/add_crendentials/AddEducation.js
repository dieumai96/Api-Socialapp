import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import TextFieldGroup from './../common/TextFieldGroup';
import TextAreaFieldGroup from './../common/TextAreaFieldGroup';
import { addEducation } from './../../actions/profileAction';
import PropTypes from 'prop-types';
class AddEducation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      school: '',
      degree: '',
      fieldofstudy: '',
      from: '',
      to: '',
      current: false,
      description: '',
      errors: {},
      disabled: false,
    }
  }
  onCheck = () => {
    this.setState({
      current: !this.state.current,
      disabled: !this.state.disabled
    })
  }
  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  onSubmit = (e) => {
    e.preventDefault();
    const EducationFormValue = {
      school: this.state.school,
      degree: this.state.degree,
      fieldofstudy: this.state.fieldofstudy,
      from: this.state.from,
      to: this.state.to,
      current: this.state.current,
      description: this.state.description,
    }
    this.props.addEducation(EducationFormValue, this.props.history);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors })
    }
  }
  render() {
    const { errors } = this.state;
    const listText = [
      { placeholder: "* School Or Bootcamp", name: "school", type: "text", error: errors.school, onChange: this.onChange, value: this.state.school },
      { placeholder: "* Degree Or Certificate", name: "degree", type: "text", error: errors.degree, onChange: this.onChange, value: this.state.degree },
      { placeholder: "Field Of Study", name: "fieldofstudy", type: "text", error: errors.fieldofstudy, onChange: this.onChange, value: this.state.fieldofstudy },
      // { placeholder: "", name: "to", type: "date", error: errors.to, onChange: this.onChange, value: this.state.to },
      // { placeholder: "", name: "from", type: "date", error: errors.from, onChange: this.onChange, value: this.state.from },
    ]
    let returnList = listText.map((text, index) => {
      return (
        <TextFieldGroup
          key={index}
          placeholder={text.placeholder}
          name={text.name}
          value={text.value}
          onChange={text.onChange}
          error={text.error}
        />
      )
    })
    return (
      <div className="add-education">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">
                Go Back
              </Link>
              <h1 className="display-4 text-center">Add Your Education</h1>
              <p className="lead text-center">Add any school, bootcamp, etc that you have attended</p>
              <small className="d-block pb-3">* = required field</small>
              <form onSubmit={this.onSubmit}>
                {returnList}
                <h6>From Date</h6>
                <TextFieldGroup
                  type="date"
                  name="from"
                  value={this.state.from}
                  onChange={this.onChange}
                  error={errors.from}
                />
                <h6>To Date</h6>
                <TextFieldGroup
                  type="date"
                  name="to"
                  value={this.state.to}
                  onChange={this.onChange}
                  error={errors.to}
                  disabled={this.state.disabled ? 'disabled' : ''}
                />
                <div className="form-check mb-4">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="current"
                    value={this.state.current}
                    checked={this.state.current}
                    onChange={this.onCheck}
                    id="current" />
                  <label className="form-check-label" htmlFor="current">
                    Current Job
                </label>
                </div>
                <div className="form-group">
                  <TextAreaFieldGroup
                    name="description"
                    placeholder="Job description"
                    value={this.state.description}
                    info="Some of your responsabilities, etc"
                    onChange={this.onChange}
                    error={errors.description}
                  />
                </div>
                <input type="submit" className="btn btn-info btn-block mt-4" value="Submit" />
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
AddEducation.propTypes = {
  addEducation: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
}
const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth,
  errors: state.errors,
})
export default connect(mapStateToProps , {addEducation})(AddEducation);