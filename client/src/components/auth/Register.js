import React, { Component } from 'react'
import classnames from 'classnames';
import { connect } from 'react-redux';
import { registerUser } from './../../actions/authAction';
import { withRouter } from 'react-router-dom';
import PropTypes  from 'prop-types'; 
class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      password: '',
      password2: '',
      error: {},
    }
  }
  onchange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }
  componentWillReceiveProps(nextProps){
      if(nextProps.errors){
          this.setState({error : nextProps.errors});
      }
  }
  onSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };
    this.props.registerUser(newUser, this.props.history);
  }
  componentDidMount(){
    if(this.props.auth.isAuthenticated){
      this.props.history.push('/dashboard');
    }
  }
  render() {
    const { error } = this.state;
    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">Create your DevConnector account</p>
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <input type="text"
                    className={classnames('form-control form-control-lg', {
                      'is-invalid': error.name
                    })} placeholder="Name"
                    onChange={this.onchange}
                    name="name"
                    value={this.state.name}
                  />
                  {error.name && (<div className="invalid-feedback">{error.name}</div>)}
                </div>
                <div className="form-group">
                  <input type="email"
                    className={classnames('form-control form-control-lg', {
                      'is-invalid': error.email
                    })}
                    placeholder="Email Address"
                    value={this.state.email}
                    onChange={this.onchange}
                    name="email" />
                  {error.email && (<div className="invalid-feedback">{error.email}</div>)}
                  <small className="form-text text-muted">This site uses Gravatar so if you want a profile image, use a Gravatar email</small>
                </div>
                <div className="form-group">
                  <input type="password"
                    className={classnames('form-control form-control-lg', {
                      'is-invalid': error.password
                    })}
                    placeholder="Password"
                    name="password"
                    value={this.state.password}
                    onChange={this.onchange}
                  />
                  {error.password && (<div className="invalid-feedback">{error.password}</div>)}
                </div>
                <div className="form-group">
                  <input type="password"
                    className={classnames('form-control form-control-lg', {
                      'is-invalid': error.password2
                    })}
                    placeholder="Confirm Password"
                    value={this.state.password2}
                    onChange={this.onchange}
                    name="password2" />
                  {error.password2 && (<div className="invalid-feedback">{error.password2}</div>)}
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
Register.propTypes = {
  registerUser : PropTypes.func.isRequired,
  auth : PropTypes.object.isRequired,
  errors : PropTypes.object.isRequired,
}
const mapStateToProps = (state) => ({
  auth: state.auth,
  errors : state.errors
})
export default connect(mapStateToProps, { registerUser })(withRouter(Register));