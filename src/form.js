import React from "react";

class Form extends React.Component {
  constructor(props) {
    super(props);
    console.log("constructor Form");
  }

  componentDidMount() {
    console.log("componentDidMount Form");
  }

  componentDidUpdate() {
    console.log("componentDidUpdate Form");
  }

  componentWillUnmount() {
    console.log("componentWillUnmount Form");
    // NO Ajax
    // No setState
  }

  render() {
    console.log("render Form");
    return (
      <form onSubmit={this.props.handleSave} className="control">
        <input type="text" name="song" />
        <input type="text" name="artist" />
        <button type="submit">Save</button>
        <button onClick={this.props.toggleForm}>Cancel</button>
      </form>
    );
  }
}

export class FormContainer extends React.PureComponent {
  state = {
    showForm: false,
    error: ""
  };

  toggleForm = () => {
    this.setState(({ showForm }) => ({
      showForm: !showForm,
      error: ""
    }));
  };

  handleSave = (event) => {
    event.preventDefault();
    const { song, artist } = event.target.elements;

    if (!song && !artist) {
      this.setState({
        error: "Song and Artist are required"
      });
      return;
    }

    this.props.add({
      song,
      artist
    });

    this.toggleForm();
  };

  render() {
    const { showForm, error } = this.state;
    console.log("render FormContainer");
    return (
      <>
        {showForm ? (
          <Form toggleForm={this.toggleForm} handleSave={this.handleSave} />
        ) : (
          <div className="control">
            <button onClick={this.toggleForm}>Add</button>
            <button onClick={this.props.remove}>Remove</button>
          </div>
        )}
        {error && <p style={{ color: "red" }}>{error}</p>}
      </>
    );
  }
}
