import { readFileSync } from 'fs';
import { queryBpmnLinksNotEnhanced, getBpmnFilePath, blobPathToRawPath, getBpmnFileBlobPath } from '../lib';

describe('lib', () => {

  it('queryBpmnLinksNotEnhanced return one bpmn link', async () => {
    window.document.body.innerHTML = readFileSync(`${__dirname}/github-commit-page-1-bpmn-added.html`).toString();
    const links = queryBpmnLinksNotEnhanced(window.document);
    expect(links).toHaveLength(1);
  });

  it('getBpmnFilePath returns url', async () => {
    window.document.body.innerHTML = readFileSync(`${__dirname}/github-diff-file-element.html`).toString();
    const path = getBpmnFilePath(window.document.body);
    expect(path).toEqual('starter/diagram.bpmn');
  });

  it('getBpmnFileBlobPath returns blob path', async () => {
    window.document.body.innerHTML = readFileSync(`${__dirname}/github-diff-file-element.html`).toString();
    const path = getBpmnFileBlobPath(window.document.body);
    expect(path).toEqual('/bpmn-io/bpmn-js-examples/blob/607f826eb1e18649b2bdc527c3c08ef47a19f20f/starter/diagram.bpmn');
  });

  it('blobPathToRawPath', async () => {
    const blobPath = '/bpmn-io/bpmn-js-examples/blob/607f826eb1e18649b2bdc527c3c08ef47a19f20f/starter/diagram.bpmn';
    const rawPath = '/bpmn-io/bpmn-js-examples/raw/607f826eb1e18649b2bdc527c3c08ef47a19f20f/starter/diagram.bpmn';
    expect(blobPathToRawPath(blobPath)).toEqual(rawPath);
  });

});
