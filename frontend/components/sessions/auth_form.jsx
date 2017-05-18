import React from 'react';

class AuthForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };

    this.update = this.update.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.loggedIn) {
      this.props.history.push('/feed');
    }
  }

  update(property) {
    return e => this.setState({ [property]: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.sendForm(this.state);
  }

  renderErrors() {
    const errorList = this.props.errors.map((error, idx) => (
      <li key={ idx }>{ error }</li>
    ));

    return (
      <ul>
        { errorList }
      </ul>
    );
  }

  render() {
    const buttonText = (
      this.props.formType === 'login'
    ) ? (
      'Log In'
    ) : (
      'Create Account'
    );

    return (
      <form>
        <input type="text" placeholder="Username"
          onChange={ this.update('username') }
          value={ this.state.username }></input>

        <input type="password" placeholder="Password"
          onChange={ this.update('password') }
          value={ this.state.password }></input>

        { this.renderErrors() }

        <button onClick={ this.handleSubmit }>{ buttonText }</button>
      </form>
    );
  }
}

export default AuthForm;
