import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TextFieldGroup from './../common/TextFieldGroup';
import TextAreaFieldGroup from './../common/TextAreaFieldGroup';
import SelectListGroup from './../common/SelectListGroup';
import InputGroup from './../common/InputGroup';
// import options from './../../constant/ListOption'; 
class CreateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displaySocialInputs: false,
      handle: '',
      company: '',
      website: '',
      location: '',
      status: '',
      skills: '',
      githubusername: '',
      bio: '',
      twitter: '',
      facebook: '',
      linkedin: '',
      youtube: '',
      instagram: '',
      errors: {},
    }
  }
  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
    console.log(this.state);
  }
  onSubmit = (e) => {
    e.preventDefault();

  }

  render() {
    const { errors, displaySocialInputs } = this.state;
    const middleTexts = [
      { placeholder: "Company", name: "company", value: this.state.company, onChange: this.onChange, error: errors.company, info: "Could be your own company or one you work for" },
      { placeholder: "Website", name: "website", value: this.state.website, onChange: this.onChange, error: errors.website, info: "Could be your own or a company website" },
      { placeholder: "Location", name: "location", value: this.state.location, onChange: this.onChange, error: errors.location, info: "City & state suggested (eg. Boston, MA)" },
      { placeholder: "Skills", name: "skills", value: this.state.skills, onChange: this.onChange, error: errors.skills, info: "Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)" },
      { placeholder: "Github Username", name: "githubusername", value: this.state.githubusername, onChange: this.onChange, error: errors.githubusername, info: "If you want your latest repos and a Github link, include your username" },
    ]
    const socialItems = [
      { name: "twitter", placeholder: "Twitter Profile URL", value: this.state.twitter, error: errors.twitter, type: "text", onChange: this.onChange, icon: "fab fa-twitter" },
      { name: "facebook", placeholder: "Facebook Profile URL", value: this.state.facebook, error: errors.facebook, type: "text", onChange: this.onChange, icon: "fab fa-facebook" },
      { name: "linkedin", placeholder: "Linkedin Profile URL", value: this.state.linkedin, error: errors.linkedin, type: "text", onChange: this.onChange, icon: "fab fa-linkedin" },
      { name: "youtube", placeholder: "Youtube Profile URL", value: this.state.youtube, error: errors.youtube, type: "text", onChange: this.onChange, icon: "fab fa-youtube" },
      { name: "instagram", placeholder: "Instagram Profile URL", value: this.state.instagram, error: errors.instagram, type: "text", onChange: this.onChange, icon: "fab fa-instagram" }
    ]
    let returnMiddleText = middleTexts.map(text => {
      return (
        <TextFieldGroup
          key={text.name}
          placeholder={text.placeholder}
          name={text.name}
          value={text.value}
          onChange={text.onChange}
          error={text.error}
          info={text.info}
        />
      )
    })
    let returnSocialItems;
    if(displaySocialInputs) {
      returnSocialItems = socialItems.map(text => {
        return (
          <InputGroup
            key={text.name}
            placeholder={text.placeholder}
            name={text.name}
            value={text.value}
            onChange={text.onChange}
            error={text.error}
            info={text.info}
            icon={text.icon}
          />
        )
      })
    }
    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">
                Create Your Profile
                      </h1>
              <p className="lead text-center">
                Let's get some information to make your profile stand out
                      </p>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="* Profile Handle"
                  name="handle"
                  value={this.state.handle}
                  onChange={this.onChange}
                  error={errors.handle}
                  info="A quie handle for your profile URL. Your full name, company name, nickname"
                />
                <SelectListGroup
                  placeholder="Status"
                  name="status"
                  value={this.state.status}
                  onChange={this.onChange}
                  error={errors.status}
                  info="Hãy cho chúng tôi biết nghề nghiệp của bạn"
                />
                {returnMiddleText}
                <TextAreaFieldGroup
                  placeholder="A short bio of yourself"
                  name="bio"
                  value={this.state.bio}
                  onChange={this.onChange}
                  error={errors.bio}
                  info="Tell us a little about yourself"
                />
                <div className="mb-3">
                  <button
                    className="btn btn-light"
                    onClick={() => {
                      this.setState(prevState => ({
                        displaySocialInputs: !prevState.displaySocialInputs,
                      }));
                    }}
                  >
                    Add Social Network Links
                  </button>
                  <span className="text-muted">
                    Optional
                  </span>
                </div>
                {returnSocialItems}
                <input type="submit" className="btn btn-info btn-block mt-4" value="Submit"/>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
CreateProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
}
const mapStateToProps = (state) => ({
  profile: state.profile,
  errors: state.errors,
})
export default connect(mapStateToProps)(CreateProfile);