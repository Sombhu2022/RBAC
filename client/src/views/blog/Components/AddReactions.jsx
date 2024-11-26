import React, { useState } from 'react'

function AddReactions({onClose , isShow}) {
 
    const [selectedReaction, setSelectedReaction] = useState("");
  
    // Handle selection of a reaction
    const handleReactionSelect = (reaction) => {
      setSelectedReaction(reaction);
      // Close the popup after selecting a reaction
      onClose()
    };
    // Available reactions (Emojis)
    const reactions = [
      { emoji: "👍", name: "Like" },
      { emoji: "❤️", name: "Love" },
      { emoji: "😂", name: "Haha" },
      { emoji: "😢", name: "Sad" },
      { emoji: "😮", name: "Surprised" }
    ];
  return (
    <div>
        { isShow && (
        <div className="absolute bg-white shadow-lg rounded-lg p-4 mt-3 space-x-4 flex items-center">
          {reactions.map((reaction, index) => (
            <button
              key={index}
              className="text-2xl hover:bg-slate-200 hover:rounded-full p-2"
              onClick={() => handleReactionSelect(reaction.name)}
            >
              {reaction.emoji}
            </button>
          ))}
        </div>
      )}</div>
  )
}

export default AddReactions