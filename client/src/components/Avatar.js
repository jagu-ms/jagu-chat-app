import React from "react";
import avatar from "assets/avatar.png";


// Avatar Component.

const Avatar = props => {
  //  let src = props.src ? `uploads/${props.src}` : avatar;
    return <img src={avatar} className="img-fluid rounded-circle mr-3 avatar" alt="" />
};

export default Avatar;