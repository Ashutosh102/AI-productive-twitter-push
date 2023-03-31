import React, { useState } from "react";
import { Copy, Plus, X } from "react-feather";

import styles from "./TwitterCard.module.css";

function TwitterCard({
  tweet = "",
  onTweetChange,
  onClose,
  showGenerateThreadBtn = false,
  onAddClick,
  placeholder = "",
  onGenerateThreadClick,
  generateButtonDisabled = false,
}) {
  const [isEditing, setIsEditing] = useState(false);

  const handleCopy = async (text) => {
    if (window.navigator?.clipboard?.writeText)
      await window.navigator.clipboard.writeText(text);
  };

  const progress = (tweet.length / 280) * 100;
  const progressDeg = parseInt((progress * 360) / 100);
  const charactersLeft = 280 - tweet.length;

  return (
    <div className={styles.container}>
      <div
        className={`icon ${styles.close}`}
        onClick={() => (onClose ? onClose() : "")}
      >
        <X />
      </div>
      {isEditing ? (
        <textarea
          defaultValue={tweet}
          placeholder={placeholder || "write here"}
          onChange={(event) =>
            onTweetChange ? onTweetChange(event.target.value) : ""
          }
          onBlur={() => setIsEditing(false)}
          autoFocus
        />
      ) : !tweet.length && placeholder ? (
        <p
          className={styles.text}
          style={{ color: "gray", fontWeight: "400" }}
          onClick={() => setIsEditing(true)}
        >
          {placeholder}
        </p>
      ) : (
        <p className={styles.text} onClick={() => setIsEditing(true)}>
          {tweet}
        </p>
      )}

      <span className={styles.line} />

      <div className={styles.bottom}>
        <div className="icon" onClick={() => handleCopy(tweet)}>
          <Copy />
        </div>

        <div className={styles.right}>
          <div
            className={styles.progress}
            style={{
              "--deg": `${progressDeg}deg`,
              "--color": charactersLeft < 0 ? "red" : "#55acee",
            }}
          >
            <div
              className={`${styles.inner} ${
                charactersLeft < 0 ? styles.red : ""
              }`}
            >
              {charactersLeft < 60 ? charactersLeft : ""}
            </div>
          </div>

          <span className={styles.bar} />

          <div
            className="icon"
            onClick={() => (onAddClick ? onAddClick() : "")}
          >
            <Plus />
          </div>

          {showGenerateThreadBtn ? (
            <>
              <span className={styles.bar} />
              <button
                className="button"
                onClick={() =>
                  onGenerateThreadClick ? onGenerateThreadClick() : ""
                }
                disabled={generateButtonDisabled}
              >
                {generateButtonDisabled ? "Generating..." : "Generate Thread"}
              </button>
            </>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}

export default TwitterCard;
