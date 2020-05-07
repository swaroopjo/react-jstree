import React, { useRef, useImperativeHandle, forwardRef } from "react";

import useJsTree from "../custom-hooks/use-js-tree"

const JsTree = forwardRef((props, ref) => {
  const jsTreeRef = useRef();
  const jsTreeHook = useJsTree(props.data, props.config, jsTreeRef);

  useImperativeHandle(ref, () => ({
    openFirstNode() {
      jsTreeHook.open_node("root_node_1");
    },
    closeFirstNode() {
      jsTreeHook.close_node("root_node_1");
    }
  }));
  return <div ref={jsTreeRef} />;
});

export default JsTree;
