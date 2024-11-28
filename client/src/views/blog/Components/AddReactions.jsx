import React, { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { addNewReaction } from "../../../store/blog/blogController";
import { toast } from "react-toastify";

function AddReactions({ blog = {} }) {
  const [isReaction, setIsReaction] = useState(false); // Whether the user has reacted
  const { user, isAuthenticate } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isAuthenticate && blog.reactions) {
      // Check if the user has reacted
      const userReaction = blog.reactions.find(
        (reaction) => reaction._id.toString() === user._id.toString()
      );
  
      setIsReaction(!!userReaction); // Update the reaction state (true if userReaction is not undefined)
    } else if (!isAuthenticate) {
      toast.info("Login first! Then access this feature.");
      setIsReaction(false); // Reset reaction state if not authenticated
    }
  }, [blog, isAuthenticate, user]);
  

  const handleReactionClick = () => {
    if (isAuthenticate) {
      const blogId = blog._id;
      // If already reacted, remove reaction, otherwise add
      dispatch(addNewReaction({ blogId, isReaction }));
      setIsReaction((prev) => !prev); // Toggle the reaction state
    } else {
      toast.info("Login first! Then access this feature.");
    }
  };

  return (
    <>
      <FaHeart
        className={`${isReaction ? "text-red-600" : "text-gray-400"} cursor-pointer`}
        onClick={handleReactionClick} // Use the click handler for toggling reaction
      />
      <span>{blog.reactions?.length}</span> {/* Display number of reactions */}
    </>
  );
}

export default AddReactions;
