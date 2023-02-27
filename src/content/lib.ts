export function queryBpmnLinksNotEnhanced(document: Document): Element[] {
    return Array.from(document.querySelectorAll("div.file[data-file-type='.bpmn']:not(.bpmn-enhanced)"));
}

export function enhanceBpmnLink(element: Element): void {
    element.classList.add('bpmn-enhanced');
}

export function getBpmnFilePath(element: Element): string | null {
    return element.querySelectorAll(".file-header[data-path]").item(0)?.getAttribute('data-path');
}

export function getBpmnFileBlobPath(element: Element): string | null {
    return element.querySelectorAll("a[href$='.bpmn']").item(0)?.getAttribute('href');
}

export function blobPathToRawPath(url: string): string {
    return url.replace('/blob/', '/raw/');
}

export function createElementFromHTML(htmlString: string): ChildNode {
    const div = document.createElement('div');
    div.innerHTML = htmlString.trim();
    return div.firstChild!;
}

export function createViewerFrame(viewerUrl: string, bpmnRawUrl: string): ChildNode {
    const style = `
        overflow-x: auto;
        border-width: 0px;
        width: 100%;
        `;
    return createElementFromHTML(`<iframe src='${viewerUrl}?bpmnUrl=${bpmnRawUrl}' style="${style}" />`);
}
