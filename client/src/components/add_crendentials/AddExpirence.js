import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import TextFieldGroup from './../common/TextFieldGroup';
import TextAreaFieldGroup from './../common/TextAreaFieldGroup';
import { addExpirence } from './../../actions/profileAction';
import PropTypes from 'prop-types';
class AddExpirence extends Component {
  constructor(props) {
    super(props);
    this.state = {
      company: '',
      title: '',
      location: '',
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
    console.log(this.state);
  }
  onSubmit = (e) => {
    e.preventDefault();
    const ExpirenceFormValue = {
      company: this.state.company,
      title: this.state.title,
      location: this.state.location,
      from: this.state.from,
      to: this.state.to,
      current: this.state.current,
      description: this.state.description,
    }
    this.props.addExpirence(ExpirenceFormValue, this.props.history);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors })
    }
  }
  render() {
    const { errors } = this.state;
    const listText = [
      { placeholder: "* Job Title", name: "title", type: "text", error: errors.title, onChange: this.onChange, value: this.state.title },
      { placeholder: "* Company", name: "company", type: "text", error: errors.company, onChange: this.onChange, value: this.state.company },
      { placeholder: "Location", name: "location", type: "text", error: errors.location, onChange: this.onChange, value: this.state.location },
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
      <div className="section add-experience">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">
                Go Back
            </Link>
              <h1 className="display-4 text-center">Add Your Experience</h1>
              <p className="lead text-center">Add any developer/programming positions that you have had in the past</p>
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
AddExpirence.propTypes = {
  addExpirence: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
}
const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth,
  errors: state.errors,
})
export default connect(mapStateToProps, { addExpirence })(AddExpirence);