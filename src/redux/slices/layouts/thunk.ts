import { changeHTMLAttribute } from './utils';
import {
    changeLayoutAction,
    changeLayoutModeAction,
    changeSidebarThemeAction,
    changeLayoutWidthAction,
    changeLayoutPositionAction,
    changeTopbarThemeAction,
    changeLeftsidebarSizeTypeAction,
    changeLeftsidebarViewTypeAction,
    changeSidebarImageTypeAction,
    changePreLoaderAction,
    changeSidebarVisibilityAction
} from './reducer';

/**
 * Changes the layout type
 * @param {*} param0
 */
export const changeLayout:any = (layout: any) => async (dispatch: (arg0: { payload: any; type: "LayoutSlice/changeLayoutAction"; }) => void) => {
    try {
        if (layout === "twocolumn") {
            document.documentElement.removeAttribute("data-layout-width");
        } else if (layout === "horizontal") {
            document.documentElement.removeAttribute("data-sidebar-size");
        } else if (layout === "semibox") {
            changeHTMLAttribute("data-layout-width", "fluid");
            changeHTMLAttribute("data-layout-style", "default");
        }
        changeHTMLAttribute("data-layout", layout);
        dispatch(changeLayoutAction(layout));
    } catch (error) { /* empty */ }
};

/**
 * Changes the layout mode
 * @param {*} param0
 */
export const changeLayoutMode:any = (layoutMode: string) => async (dispatch: (arg0: { payload: any; type: "LayoutSlice/changeLayoutModeAction"; }) => void) => {
    try {
        changeHTMLAttribute("data-layout-mode", layoutMode);
        dispatch(changeLayoutModeAction(layoutMode));
    } catch (error) { /* empty */ }
};

/**
 * Changes the left sidebar theme
 * @param {*} param0
 */
export const changeSidebarTheme:any = (theme: any) => async (dispatch: any) => {
    try {
        changeHTMLAttribute("data-sidebar", theme);
        dispatch(changeSidebarThemeAction(theme));
    } catch (error) {
        // console.log(error);
    }
};

/**
 * Changes the layout width
 * @param {*} param0
 */
export const changeLayoutWidth:any = (layoutWidth: string) => async (dispatch: (arg0: { payload: any; type: "LayoutSlice/changeLayoutWidthAction"; }) => void) => {
    try {
        if (layoutWidth === 'lg') {
            changeHTMLAttribute("data-layout-width", "fluid");
        } else {
            changeHTMLAttribute("data-layout-width", "boxed");
        }
        dispatch(changeLayoutWidthAction(layoutWidth));
    } catch (error) {
        return error;
    }
};

/**
 * Changes the layout position
 * @param {*} param0
 */
export const changeLayoutPosition:any = (layoutposition: string) => async (dispatch: (arg0: { payload: any; type: "LayoutSlice/changeLayoutPositionAction"; }) => void) => {
    try {
        changeHTMLAttribute("data-layout-position", layoutposition);
        dispatch(changeLayoutPositionAction(layoutposition));
    } catch (error) {
        // console.log(error);
    }
};

/**
 * Changes the topbar themes
 * @param {*} param0
 */
export const changeTopbarTheme:any = (topbarTheme: string) => async (dispatch: (arg0: { payload: any; type: "LayoutSlice/changeTopbarThemeAction"; }) => void) => {
    try {
        changeHTMLAttribute("data-topbar", topbarTheme);
        dispatch(changeTopbarThemeAction(topbarTheme));

    } catch (error) {
        // console.log(error);
    }
};

/**
 * Changes the topbar themes
 * @param {*} param0
 */
export const changeSidebarImageType:any = (leftsidebarImagetype: string) => async (dispatch: (arg0: { payload: any; type: "LayoutSlice/changeSidebarImageTypeAction"; }) => void) => {
    try {
        changeHTMLAttribute("data-sidebar-image", leftsidebarImagetype);
        dispatch(changeSidebarImageTypeAction(leftsidebarImagetype));
    } catch (error) {
        // console.log(error);
    }
};

/**
 * Changes the Preloader
 * @param {*} param0
 */
export const changePreLoader:any = (preloaderTypes: string) => async (dispatch: (arg0: { payload: any; type: "LayoutSlice/changePreLoaderAction"; }) => void) => {
    try {
        changeHTMLAttribute("data-preloader", preloaderTypes);
        dispatch(changePreLoaderAction(preloaderTypes));
    } catch (error) {
        // console.log(error);
    }
};

/**
 * Changes the topbar themes
 * @param {*} param0
 */
export const changeLeftsidebarSizeType:any = (leftsidebarSizetype: any) => async (dispatch: (arg0: { payload: any; type: "LayoutSlice/changeLeftsidebarSizeTypeAction"; }) => void) => {
    try {
        switch (leftsidebarSizetype) {
            case 'lg':
                changeHTMLAttribute("data-sidebar-size", "lg");
                break;
            case 'md':
                changeHTMLAttribute("data-sidebar-size", "md");
                break;
            case "sm":
                changeHTMLAttribute("data-sidebar-size", "sm");
                break;
            case "sm-hover":
                changeHTMLAttribute("data-sidebar-size", "sm-hover");
                break;
            default:
                changeHTMLAttribute("data-sidebar-size", "lg");
        }
        dispatch(changeLeftsidebarSizeTypeAction(leftsidebarSizetype));

    } catch (error) {
        // console.log(error);
    }
};

/**
 * Changes the topbar themes
 * @param {*} param0
 */
export const changeLeftsidebarViewType:any = (leftsidebarViewtype: string) => async (dispatch: (arg0: { payload: any; type: "LayoutSlice/changeLeftsidebarViewTypeAction"; }) => void) => {
    try {
        changeHTMLAttribute("data-layout-style", leftsidebarViewtype);
        dispatch(changeLeftsidebarViewTypeAction(leftsidebarViewtype));
    } catch (error) {
        // console.log(error);
    }
};

/**
 * Changes the sidebar visibility
 * @param {*} param0
 */
export const changeSidebarVisibility:any = (sidebarVisibilitytype: string) => async (dispatch: (arg0: { payload: any; type: "LayoutSlice/changeSidebarVisibilityAction"; }) => void) => {
    try {
        changeHTMLAttribute("data-sidebar-visibility", sidebarVisibilitytype);
        dispatch(changeSidebarVisibilityAction(sidebarVisibilitytype));
    } catch (error) { /* empty */ }
};