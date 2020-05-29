import React, { useRef, useImperativeHandle, forwardRef } from "react";
import { useEffect } from "react";
import $ from "jquery";
// eslint-disable-next-line
import jstree from "jstree";

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

const JsTree = forwardRef((props, ref) => {
    const jsTreeRef = useRef(null);

    useEffect(() => {
        appendJstreeCss();
        $(jsTreeRef.current).jstree(props.config);
    }, [jsTreeRef]);

    useImperativeHandle(ref, () => ({

        onReady(callback){
            $(jsTreeRef.current).on('ready.jstree', callback);
        },
        isDisabled(node){
            return $(jsTreeRef.current).jstree('is_disabled');
        },
        onSelectNode(callback){
            $(jsTreeRef.current).on('select_node.jstree', callback);
        },
        openAll(){
            $(jsTreeRef.current).jstree('open_all');
        },
        closeAll(){
            $(jsTreeRef.current).jstree('close_all');
        },
        destroy(){
            $(jsTreeRef.current).jstree('destroy');
        }


    }));
    return <div ref = { jsTreeRef } />;
});

export default JsTree;