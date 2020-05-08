import React, { useRef, useImperativeHandle, forwardRef } from "react";
import { useEffect } from "react";

import $ from "jquery";
// eslint-disable-next-line
import jstree from "jstree";
const JsTree = forwardRef((props, ref) => {
  const jsTreeRef = useRef(null);

  const appendJstreeCss = () => {
    const cssFiles = [
      "https://cdnjs.cloudflare.com/ajax/libs/jstree/3.2.1/themes/default/style.min.css"
    ];

    cssFiles.forEach(css => {
      let tag = document.createElement("link");
      tag.setAttribute("href", css);
      tag.setAttribute("rel", "stylesheet");
      document.head.insertBefore(tag, document.head.childNodes[0]);
    });
  };

  useEffect(() => {
    appendJstreeCss();
    $(jsTreeRef.current).jstree({
      core: {
        data: props.data,
        themes: {
          dots: false
        }
      },
      plugins: ["search", "unique", "dnd", "types", "contextmenu"]
    });
  }, [props.data, jsTreeRef]);

  useImperativeHandle(ref, () => ({
    openFirstNode(id) {
      $(jsTreeRef.current).jstree("open_node", id);
    },
    closeFirstNode(id) {
      $(jsTreeRef.current).jstree("close_node", id);
    },
    onSelectNode(callback) {
      $(jsTreeRef.current).on("select_node.jstree", callback);
    },
    openAll() {
      $(jsTreeRef.current).jstree("open_all");
    },
    closeAll() {
      $(jsTreeRef.current).jstree("close_all");
    }
  }));
  return <div ref={jsTreeRef} />;
});

export default JsTree;
