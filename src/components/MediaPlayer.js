import React from "react";

function MediaPlayer({ type, src }) {
  if (!src) return null; // No media, don't render anything

  if (type === "video") {
    return (
      <div className="media-container">
        <video width="100%" height="200" controls>
          <source src={src} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    );
  }

  if (type === "audio") {
    return (
      <div className="media-container">
        <audio controls>
          <source src={src} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      </div>
    );
  }

  return null;
}

export default MediaPlayer;