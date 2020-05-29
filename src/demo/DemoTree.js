import React, { useRef, useEffect, useState, useCallback, useMemo } from "react";
import JsTree from "../components/JsTree";
import treeData from "./sample-data/tree.data.json";

const plugins = ["search", "unique", "dnd", "types", "contextmenu"];

const MemoizedTree = React.memo((props) => {
    console.log("Rendering child component");
    return <JsTree ref={props.jsTreeRef} config={props.config} />;
});

export default function() {
    const [someText, setSomeText] = useState('');
    const [ready, setReady] = useState(false);
    const jsTreeRef = useRef(null);
    const config = useRef({});
    const isDragAllowed = useCallback((nodes) => {
        let rtn = true;
        nodes.forEach(function (obj) {
            if (obj.children && obj.children.length > 0)
                rtn = false;
        });
        return rtn;
    }, []);
    const isFirstNodeDisabled = useCallback(() => {
        const disabled = jsTreeRef.current.isDisabled(treeData.data[0]);
        console.log('disabled: '+ disabled);
    }, []);
    const onSelectNode = useCallback((event, node) => {
        console.log("Node selected: ", node);
        console.log("Event: ", event);
    }, []);

    const customMenu = useCallback((node) => {
        console.log('custom menu node:'+node);
        if(node.original.type === 'I'){
            return {
                "firstMenu" : {
                    "label" : "First Menu",
                    "action" : function (node) {console.log('Click first menu'); }
                },
                "secondMenu" : {
                    "label" : "Second Menu",
                    "action" : function (node) { console.log('Click second menu'); }
                },
            }
        }
        else {
            return {
                "firstMenu" : {
                    "label" : "First Menu",
                    "action" : function (node) {console.log('Click first menu'); }
                },
                "secondMenu" : {
                    "label" : "Second Menu",
                    "action" : function (node) { console.log('Click second menu'); },
                    "_disabled": true
                },
                "thirdMenu" : {
                    "label" : "Third Menu",
                    "action" : function (node) { console.log('Click third menu'); }
                },
            };
        }
    },[]);

    useEffect(() => {
        config.current = {
            core: {
                data: treeData.data,
                themes: {
                    dots: false
                }
            },
            plugins: plugins,
            dnd: {
                is_draggable : isDragAllowed
            },
            contextmenu : {
                items : customMenu
            }
        };
        setReady(true);
    }, []);

    useEffect(() => {
        console.log('Running tree event registration effect');
        if(ready && jsTreeRef.current !== null){
            jsTreeRef.current.onSelectNode(onSelectNode);
            return () => {
                console.log('running destroy');
                jsTreeRef.current.destroy();
            }
        }
    }, [ready]);

    const openAll = useCallback(() => {
        jsTreeRef.current.openAll();
    }, []);
    const closeAll = useCallback(() => {
        jsTreeRef.current.closeAll();
    }, []);
    return (
        <>
            <button onClick={openAll}>Open All</button>
            <button onClick={closeAll}>Close All</button>
            <button onClick={isFirstNodeDisabled}>Is First Node Disabled</button>
            {
                ready && <MemoizedTree jsTreeRef={jsTreeRef} config={config.current} />
            }

        </>
    );
}
