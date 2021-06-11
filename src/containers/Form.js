import React, { useState } from "react";

export const Form = ({ add, remove }) => {
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState("");

  function toggleForm() {
    setShowForm((prevShowForm) => !prevShowForm);
    setError("");
  }

  const handleSave = (event) => {
    event.preventDefault();
    const { song, artist } = event.target.elements;

    if (!song.value && !artist.value) {
      setError("Song and Artist are required");
      return;
    }

    add({
      song: song.value,
      artist: artist.value
    });

    toggleForm();
  };

  return (
    <>
      {showForm ? (
        <form onSubmit={handleSave} className="control">
          <input type="text" name="song" />
          <input type="text" name="artist" />
          <button type="submit">Save</button>
          <button onClick={toggleForm}>Cancel</button>
        </form>
      ) : (
        <div className="control">
          <button onClick={toggleForm}>Add</button>
          <button onClick={remove}>Remove</button>
        </div>
      )}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </>
  );
};
