import React, { useRef, useEffect } from "react";
import JsTree from "../components/JsTree";
import treeData from "./sample-data/tree.data.json";

const plugins = ["search", "unique", "dnd", "types", "contextmenu"];


export default function() {
    const jsTreeRef = useRef(null);

    const isDragAllowed = (nodes) => {
        let rtn = true;
        nodes.forEach(function (obj) {
            if (obj.children && obj.children.length > 0)
                rtn = false;
        });
        return rtn;
    };

    const isFirstNodeDisabled = () => {
        jsTreeRef.current.call('is_disabled',
            treeData.data[0],
            (isDisabled) => {
                console.log('First node disabled: '+isDisabled);
            });
    };

    const jsTreeConfig = {
        core: {
            data: treeData.data,
            themes: {
                dots: false
            }
        },
        plugins: plugins,
        dnd: {
            is_draggable : isDragAllowed
        }
    };

    const onSelectNode = (event, node) => {
        console.log("Node selected: ", node);
        console.log("Event: ", event);
    };

    useEffect(() => {
        jsTreeRef.current.on("select_node.jstree", onSelectNode);
        return () => {
            jsTreeRef.current.trigger('destroy');
        }
    }, []);

    return (
        <>
            <button onClick={() => jsTreeRef.current.trigger('open_all')}>Open Alls</button>
            <button onClick={() => jsTreeRef.current.trigger('close_all')}>Close All</button>
            <button onClick={isFirstNodeDisabled}>Is First Node Disabled</button>

            <JsTree ref={jsTreeRef} config={jsTreeConfig} />
        </>
    );
}
