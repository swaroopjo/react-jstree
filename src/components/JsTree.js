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

    const getDndOptions = () => {
        const dnd = {};
        if(typeof(props.config.dnd.is_draggable) === "function"){
            dnd.is_draggable = props.config.dnd.is_draggable;
        }
        if(typeof(props.config.dnd.always_copy) === "boolean"){
            dnd.always_copy = props.config.dnd.always_copy;
        }
        if(typeof(props.config.dnd.copy) === "boolean"){
            dnd.copy = props.config.dnd.copy;
        }
        if(typeof(props.config.dnd.open_timeout) === "number"){
            dnd.open_timeout = props.config.dnd.open_timeout;
        }
        if(typeof(props.config.dnd.check_while_dragging) === "boolean"){
            dnd.check_while_dragging = props.config.dnd.check_while_dragging;
        }
        if(typeof(props.config.dnd.inside_props) === "number"){
            dnd.inside_props = props.config.dnd.inside_props;
        }
        if(typeof(props.config.dnd.drag_selection) === "boolean"){
            dnd.drag_selection = props.config.dnd.drag_selection;
        }
        if(typeof(props.config.dnd.touch) === "string"){
            dnd.touch = props.config.dnd.touch;
        }
        if(typeof(props.config.dnd.large_drop_target) === "boolean"){
            dnd.large_drop_target = props.config.dnd.large_drop_target;
        }
        if(typeof(props.config.dnd.large_drag_target) === "boolean"){
            dnd.large_drag_target = props.config.dnd.large_drag_target;
        }
        if(typeof(props.config.dnd.use_html5) === "boolean"){
            dnd.use_html5 = props.config.dnd.use_html5;
        }
        if(Object.keys(dnd).length > 0){
            return dnd;
        }
        return null;
    };
    const getSearchOptions = () => {
      const searchOptions = {};
        if(typeof(props.config.search.fuzzy) === "boolean"){
            searchOptions.fuzzy = props.config.search.fuzzy;
        }
        if(typeof(props.config.search.case_sensitive) === "boolean"){
            searchOptions.case_sensitive = props.config.search.case_sensitive;
        }
        if(typeof(props.config.search.show_only_matches) === "boolean"){
            searchOptions.show_only_matches = props.config.search.show_only_matches;
        }
        if(typeof(props.config.search.show_only_matches_children) === "boolean"){
            searchOptions.show_only_matches_children = props.config.search.show_only_matches_children;
        }
        if(typeof(props.config.search.close_opened_onclear) === "boolean"){
            searchOptions.close_opened_onclear = props.config.search.close_opened_onclear;
        }
        if(typeof(props.config.search.search_leaves_only) === "boolean"){
            searchOptions.search_leaves_only = props.config.search.search_leaves_only;
        }
        if(typeof(props.config.search.search_callback) === "function"){
            searchOptions.search_callback = props.config.search.search_callback;
        }
        if(Object.keys(searchOptions).length > 0){
            return searchOptions;
        }

    };
    const getCheckboxOptions = () => {
        const checkboxOptions = {};
        if(typeof(props.config.checkbox.visible) === 'boolean'){
            checkboxOptions.visible = props.config.checkbox.visible;
        }
        if(typeof(props.config.checkbox.three_state) === 'boolean'){
            checkboxOptions.three_state = props.config.checkbox.three_state;
            if(props.config.checkbox.three_state !== true && typeof(props.config.checkbox.cascade) === 'string'){
                checkboxOptions.cascade = props.config.checkbox.cascade;
            }
        }
        if(typeof(props.config.checkbox.whole_node) === 'boolean'){
            checkboxOptions.whole_node = props.config.checkbox.whole_node;
        }
        if(typeof(props.config.checkbox.tie_selection) === 'boolean'){
            checkboxOptions.tie_selection = props.config.checkbox.tie_selection;
        }
        if(typeof(props.config.checkbox.cascade_to_disable) === 'string'){
            checkboxOptions.cascade_to_disable = props.config.checkbox.cascade_to_disable;
        }
        if(typeof(props.config.checkbox.cascade_to_disable) === 'string'){
            checkboxOptions.cascade_to_disable = props.config.checkbox.cascade_to_disable;
        }
        if(Object.keys(checkboxOptions).length > 0){
            return checkboxOptions;
        }
        return null;
    };
    const getCoreOptions = () => {
        const coreOptions = {
            data: [] // set the default
        };
        if(typeof(props.config.core.data) === "object"){
            coreOptions.data = props.config.core.data;
        }
        if(typeof(props.config.core.strings) === "object" || typeof(props.config.core.strings) === "boolean" || typeof(props.config.core.strings) === "function"){
            coreOptions.strings = props.config.core.strings;
        }
        if(typeof(props.config.core.check_callback) === "function"){
            coreOptions.check_callback = props.config.core.check_callback;
        }
        if(typeof(props.config.core.error) === "function"){
            coreOptions.error = props.config.core.error;
        }
        if(typeof(props.config.core.animation) === "boolean"){
            coreOptions.animation = props.config.core.animation;
        }
        if(typeof(props.config.core.multiple) === "boolean"){
            coreOptions.multiple = props.config.core.multiple;
        }
        if(typeof(props.config.core.themes) === "object"){
            const themeOptions = {};
            if(typeof(props.config.core.themes.name) === "boolean" || typeof(props.config.core.themes.name) === "string"){
                themeOptions.name = props.config.core.themes.name;
            }
            if(typeof(props.config.core.themes.url) === "boolean" || typeof(props.config.core.themes.url) === "string"){
                themeOptions.url = props.config.core.themes.url;
                if(props.config.core.themes.url === true && typeof(props.config.core.themes.dir) === "string"){
                    themeOptions.dir = props.config.core.themes.dir;
                }
            }
            if(typeof(props.config.core.themes.dots) === "boolean"){
                themeOptions.dots = props.config.core.themes.dots;
            }
            if(typeof(props.config.core.themes.icons) === "boolean"){
                themeOptions.icons = props.config.core.themes.icons;
            }
            if(typeof(props.config.core.themes.ellipsis) === "boolean"){
                themeOptions.ellipsis = props.config.core.themes.ellipsis;
            }
            if(typeof(props.config.core.themes.stripes) === "boolean"){
                themeOptions.stripes = props.config.core.themes.stripes;
            }
            if(typeof(props.config.core.themes.variant) === "boolean" || typeof(props.config.core.themes.variant) === "string"){
                themeOptions.variant = props.config.core.themes.variant;
            }
            if(typeof(props.config.core.themes.responsive) === "boolean"){
                themeOptions.responsive = props.config.core.themes.responsive;
            }
            coreOptions.themes = themeOptions;
        }
        if(typeof(props.config.core.expand_selected_onload) === "boolean"){
            coreOptions.expand_selected_onload = props.config.core.expand_selected_onload;
        }
        if(typeof(props.config.core.worker) === "boolean"){
            coreOptions.worker = props.config.core.worker;
        }
        if(typeof(props.config.core.force_text) === "boolean"){
            coreOptions.force_text = props.config.core.force_text;
        }
        if(typeof(props.config.core.dblclick_toggle) === "boolean"){
            coreOptions.dblclick_toggle = props.config.core.dblclick_toggle;
        }
        if(typeof(props.config.core.loaded_state) === "boolean"){
            coreOptions.loaded_state = props.config.core.loaded_state;
        }
        if(typeof(props.config.core.keyboard) === "function"){
            coreOptions.keyboard = props.config.core.keyboard;
        }
        return coreOptions;
    };
    const getContextMenuOptions = () => {
        const contextMenuOptions = {};
        if(typeof(props.config.contextmenu.select_node) === 'boolean'){
            contextMenuOptions.select_node = props.config.contextmenu.select_node;
        }
        if(typeof(props.config.contextmenu.show_at_node) === 'boolean'){
            contextMenuOptions.show_at_node = props.config.contextmenu.show_at_node;
        }
        if(typeof(props.config.contextmenu.items) === 'object' || typeof(props.config.contextmenu.items) === 'function'){
            contextMenuOptions.items = props.config.contextmenu.items;
        }
        if(Object.keys(contextMenuOptions).length > 0){
            return contextMenuOptions;
        }
        return null;
    };
    const getSortOptions = () => {
        const sortOptions = {};
      if(typeof(props.config.sort) === 'function'){
          return props.config.sort;
      }
      return null;
    };
    const getStateOptions = () => {
        const stateOptions = {};
        if(typeof(props.config.state.key) === 'string'){
            stateOptions.key = props.config.state.key;
        }
        if(typeof(props.config.state.events) === 'string'){
            stateOptions.events = props.config.state.events;
        }
        if(typeof(props.config.state.ttl) === 'number' || typeof(props.config.state.ttl) === 'boolean'){
            stateOptions.ttl = props.config.state.ttl;
        }
        if(typeof(props.config.state.filter) === 'function'){
            stateOptions.filter = props.config.state.filter;
        }
        if(typeof(props.config.state.preserve_loaded) === 'boolean'){
            stateOptions.preserve_loaded = props.config.state.preserve_loaded;
        }
        if(Object.keys(stateOptions).length > 0){
            return stateOptions;
        }
        return null;
    };
    const getTypesOptions = () => {
        const typesOptions = {};
        if(typeof(props.config.types) == 'object'){
            for (let [key, value] of Object.entries(props.config.types)) {
                const childObject = {};
                if(typeof(value) === 'object'){
                    for (let [subKey, subValue] of Object.entries(value)) {
                        if(subKey === 'valid_children' && typeof(subValue) === 'array'){
                            childObject.valid_children = subValue;
                        }
                        if(subKey === 'max_children' && typeof(subValue) === 'number'){
                            childObject.max_children = subValue;
                        }
                        if(subKey === 'max_depth' && typeof(subValue) === 'number'){
                            childObject.max_depth = subValue;
                        }
                        if(subKey === 'icon' && typeof(subValue) === 'string'){
                            childObject.icon = subValue;
                        }
                        if(subKey === 'li_attr' && typeof(subValue) === 'object'){
                            childObject.li_attr = subValue;
                        }
                        if(subKey === 'a_attr' && typeof(subValue) === 'object'){
                            childObject.a_attr = subValue;
                        }

                    }
                }
                if(Object.keys(childObject).length > 0){
                    typesOptions[key] = childObject;
                }
            }
        }
        if(Object.keys(typesOptions).length > 0){
            return typesOptions;
        }
        return null;
    };
    const getUniqueOptions = () => {
        const uniqueOptions = {};
        if(typeof(props.config.unique.case_sensitive) === 'boolean'){
            uniqueOptions.case_sensitive = props.config.unique.case_sensitive;
        }
        if(typeof(props.config.unique.trim_whitespace) === 'boolean'){
            uniqueOptions.trim_whitespace = props.config.unique.trim_whitespace;
        }
        if(typeof(props.config.unique.duplicate) === 'function'){
            uniqueOptions.duplicate = props.config.unique.duplicate;
        }
        if(Object.keys(uniqueOptions).length > 0){
            return uniqueOptions;
        }
        return null;
    };

    useEffect(() => {
        appendJstreeCss();
        const pluginOptions = {};
        if(props.config.plugins){
            if(props.config.plugins.includes('dnd') && props.config.dnd){
                const dndOptions = getDndOptions();
                if(dndOptions) {
                    pluginOptions.dnd = dndOptions;
                }
            }
            if(props.config.plugins.includes('search') && props.config.search){
                const searchOptions = getSearchOptions();
                if(searchOptions) {
                    pluginOptions.dnd = searchOptions;
                }
            }
            if(props.config.plugins.includes('checkbox') && props.config.checkbox){
                const checkboxOptions = getCheckboxOptions();
                if(checkboxOptions) {
                    pluginOptions.checkbox = checkboxOptions;
                }
            }
            if(props.config.plugins.includes('sort') && props.config.sort){
                const sortOptions = getSortOptions();
                if(sortOptions) {
                    pluginOptions.sort = sortOptions;
                }
            }
            if(props.config.plugins.includes('contextMenu') && props.config.contextmenu){
                const contextMenuOptions = getContextMenuOptions();
                if(contextMenuOptions) {
                    pluginOptions.contextmenu = contextMenuOptions;
                }
            }
            if(props.config.plugins.includes('state') && props.config.state){
                const stateOptions = getStateOptions();
                if(stateOptions) {
                    pluginOptions.state = stateOptions;
                }
            }
            if(props.config.plugins.includes('types') && props.config.types){
                const typesOptions = getTypesOptions();
                if(typesOptions) {
                    pluginOptions.types = typesOptions;
                }
            }
            if(props.config.plugins.includes('unique') && props.config.unique){
                const uniqueOptions = getUniqueOptions();
                if(uniqueOptions) {
                    pluginOptions.unique = uniqueOptions;
                }
            }
            pluginOptions.plugins = props.config.plugins;
        }
        const jsTreeOptions = {...pluginOptions};
        jsTreeOptions.core = getCoreOptions();

        $(jsTreeRef.current).jstree(jsTreeOptions);

    }, [jsTreeRef]);

    useImperativeHandle(ref, () => ({

        on(eventName, callback){
            $(jsTreeRef.current).on(eventName, callback);
        },
        trigger(eventName) {
            $(jsTreeRef.current).jstree(eventName);
        },
        call(eventName, params, callback){
            const result = $(jsTreeRef.current).jstree(eventName, params);
            return callback(result);
        }

    }));
    return <div ref = {
        jsTreeRef
    }
    />;
});

export default JsTree;