import React, { useRef } from "react";
import JsTree from "../components/JsTree";
import treeData from "./sample-data/tree.data.json";

export default function() {
  const jsTreeRef = useRef();

  return (
    <>
      <button onClick={() => jsTreeRef.current.openFirstNode()}>
        Open first node
      </button>
      <button onClick={() => jsTreeRef.current.closeFirstNode()}>
        Close first node
      </button>
      <JsTree ref={jsTreeRef} data={treeData.data} />
    </>
  );
}
