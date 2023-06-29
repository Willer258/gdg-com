/**
 * Changes the body attribute
 */
 const changeHTMLAttribute = (attribute: string, value: string) => {
    if (document.documentElement) document.documentElement.setAttribute(attribute, value);
    return true;
}
export { changeHTMLAttribute };