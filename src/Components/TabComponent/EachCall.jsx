import React from "react";

export default function EachCall(props) {
  // destructure all props
  const {
    id,
    call_type,
    created_at,
    direction,
    duration,
    is_archived,
    to,
    via,
  } = props;

  console.log(created_at);

  return (
    <div>
      <div>
        <p>{created_at}</p>
      </div>
      <div className="archive-all">
        <span>each call</span>
      </div>
    </div>
  );
}
