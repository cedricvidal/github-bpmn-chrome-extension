import * as React from 'react';
import ReactBpmn from 'react-bpmn';

function onShown() {
  console.log('diagram shown');
}

function onLoading() {
  console.log('diagram loading');
}

function onError(err: Error) {
  console.log('failed to show diagram', err);
}

console.log('IFrame Location', document.location);
const params = (new URL(document.location.href)).searchParams;
const bpmnUrl = params.get('bpmnUrl');

const App: React.FC = () => (
  <ReactBpmn
    url={bpmnUrl}
    onShown={ onShown }
    onLoading={ onLoading }
    onError={ onError }
  />
);

export default App;
