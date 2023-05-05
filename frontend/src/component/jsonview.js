import { Panel } from "rsuite";
import {JSONTree} from 'react-json-tree';


const JSONView = ({ formValue, formError }) => (
    <div style={{ marginBottom: 10 }}>
      <Panel className="json-tree-wrapper" header={<p>formValue</p>}>
        <JSONTree data={formValue} />
      </Panel>
  
      <Panel className="json-tree-wrapper" header={<p>formError</p>}>
        <JSONTree data={formError} />
      </Panel>
    </div>
  );

  export default JSONView;