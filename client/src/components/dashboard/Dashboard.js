import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile , deleteAccount} from '../../actions/profileAction';
import Spinner from '../common/Spinner';
import { Link } from 'react-router-dom';
import ProfileAction from './ProfileAction';
class DashBoard extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }
  onDeleteAccount  = () =>{
    this.props.deleteAccount();
  }
  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;
    let dashboardContent;
    if (profile === null || loading) {
      dashboardContent = <Spinner />
    } else {
      if (Object.keys(profile).length > 0) {
        const link = `/profile/${user.name}`;
        dashboardContent = (
          <div>
            <p className="lead text-muted">Welcome <Link to={link}>{user.name}</Link></p>
            <ProfileAction />
            <div  style = {{clear : 'both'}}/>
            <button className="btn btn-danger" onClick = {this.onDeleteAccount}>Delete My Account</button>
          </div>
        )
      } else {
        dashboardContent = (
          <div>
            <p className="lead text-muted">Welcome {user.name}</p>
            <p>You have not yet setup a profile, please add some info</p>
            <Link to="/create-profile" className="btn btn-lg btn-info">
              Create Profile
            </Link>

          </div>
        );
      }
    }
    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4"> Dashboard </h1>
              {dashboardContent}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
DashBoard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount : PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
}
const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth,
})
export default connect(mapStateToProps, { getCurrentProfile , deleteAccount })(DashBoard);