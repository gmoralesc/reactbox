import React from "react";

export class FormContainer extends React.Component {
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
    return (
      <>
        {showForm ? (
          <form onSubmit={this.handleSave}>
            <input type="text" name="song" />
            <input type="text" name="artist" />
            <button type="submit">Save</button>
            <button onClick={this.toggleForm}>Cancel</button>
          </form>
        ) : (
          <>
            <button onClick={this.toggleForm}>Add</button>
            <button onClick={this.props.remove}>Remove</button>
          </>
        )}
        {error && <p style={{ color: "red" }}>{error}</p>}
      </>
    );
  }
}
