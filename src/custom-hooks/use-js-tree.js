import { useEffect } from "react";

import $ from "jquery";
import { findDOMNode } from "react-dom";
// eslint-disable-next-line
import jstree from "jstree";

const useJsTree = (data, config, jsTreeRef) => {
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
    $(findDOMNode(jsTreeRef.current)).jstree({
      core: {
        data: data,
        themes: {
          dots: false
        }
      },
      plugins: ["search", "unique", "dnd", "types", "contextmenu"]
    });
  }, [data, jsTreeRef]);

  return {
    open_node: id => {
      $(findDOMNode(jsTreeRef.current)).jstree("open_node", id);
    },
    close_node: id => {
      $(findDOMNode(jsTreeRef.current)).jstree("close_node", id);
    }
  };
};

export default useJsTree;
