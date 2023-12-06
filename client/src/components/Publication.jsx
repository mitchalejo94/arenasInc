import React from "react";
import { useParams } from "react-router-dom";
function Publication() {
  let { id } = useParams();
  return <div>Publication ID: {id}</div>;
}

export default Publication;
