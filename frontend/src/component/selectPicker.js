import { SelectPicker } from 'rsuite';

const data = ['Eugenia', 'Bryan', 'Linda', 'Nancy', 'Lloyd', 'Alice', 'Julia', 'Albert'].map(
  item => ({ label: item, value: item })
);

const CustomSelectPicker = ({ placement, placeholder }) => (
  <div>
  <SelectPicker data={data} placement={placement} placeholder={placeholder} />
  </div>
);

export default CustomSelectPicker;