import React from 'react';
import 'rc-collapse/assets/index.css';
import Collapse, { Panel } from 'rc-collapse';

const panelStyles = {};

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

const FAQAccordion = React.createClass({
  getInitialState() {
    return {
      activeKey: ['4'],
    };
  },

  onChange(activeKey) {
    this.setState({
      activeKey,
    });
  },

  getItems() {
    const items = [];
    for (let i = 0, len = 3; i < len; i++) {
      const key = i + 1;
      items.push(
        <Panel header={`This is panel header ${key}`} key={key}>
          <p>{text}</p>
        </Panel>
      );
    }
    items.push(
      <Panel header={`This is panel header 4`} key="4">
        <Collapse defaultActiveKey="1">
          <Panel header={`This is panel nest panel`} key="1">
            <p>{text}</p>
          </Panel>
        </Collapse>
      </Panel>
    );

    return items;
  },

  render() {
    const activeKey = this.state.activeKey;
    return (<div style={{ margin: 20, width: 400 }}>
      <Collapse
        accordion={true}
        onChange={this.onChange}
        activeKey={activeKey}
      >
        {this.getItems()}
      </Collapse>
    </div>);
  },
});

FAQAccordion.propTypes = {
  children: React.PropTypes.string.isRequired,
  onClick: React.PropTypes.func,
};

export default FAQAccordion;
