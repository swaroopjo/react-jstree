import React, { useRef, useEffect } from "react";
import JsTree from "../components/JsTree";
import treeData from "./sample-data/tree.data.json";

export default function() {
    const jsTreeRef = useRef();
    const onSelectNode = (event, node) => {
        console.log("Node selected: ", node);
        console.log("Event: ", event);
    };
    useEffect(() => {
        jsTreeRef.current.onSelectNode(onSelectNode);
    }, []);

    return (
        <>
            <button onClick={() => jsTreeRef.current.openAll()}>Open All</button>
            <button onClick={() => jsTreeRef.current.closeAll()}>Close All</button>
            <JsTree ref={jsTreeRef} data={treeData.data} />
        </>
    );
}
