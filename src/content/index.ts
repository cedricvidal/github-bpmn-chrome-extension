import { blobPathToRawPath, createViewerFrame, enhanceBpmnLink, getBpmnFileBlobPath, queryBpmnLinksNotEnhanced } from './lib';

console.log('Hey, this is a github page!');

const viewerUrl = chrome.runtime.getURL('viewer/index.html');

const observer = new MutationObserver(records => {
    const bpmnLinks = queryBpmnLinksNotEnhanced(document);
    if(bpmnLinks.length > 0) {
        console.log("Found " + bpmnLinks.length + " BPMN links");
        
        const { protocol, host } = window.location;
        bpmnLinks.forEach(fileBlock => {
            enhanceBpmnLink(fileBlock);
            const bpmnPath = getBpmnFileBlobPath(fileBlock);
            if(bpmnPath) {
                console.log('Found BPMN file', bpmnPath);

                const bpmnFullPath = blobPathToRawPath(bpmnPath);
                const bpmnRawUrl = protocol + host + bpmnFullPath;
                const fileContent = fileBlock.querySelectorAll(".js-file-content")[0];
                const blobWrapper = fileContent.querySelectorAll("div.js-blob-wrapper")[0];
                const viewerFrame = createViewerFrame(viewerUrl, bpmnRawUrl);
                blobWrapper.parentNode!.insertBefore(viewerFrame, blobWrapper);

            } else {
                console.log("Could not find BPMN file path in file block");
            }
        });
    }
});
observer.observe(document, {
    // Tweak what you're looking for depending on what change you want to find.
    childList: true,
    subtree: true,
    attributes: true
});
