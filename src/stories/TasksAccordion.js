import React from 'react';
import 'rc-collapse/assets/index.css';
import Collapse, { Panel } from 'rc-collapse';

const panelStyles = {};

const text = `Task complete`;

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
          <p>`User with id: {this.props.user} {text}`</p>
        </Panel>
      );
    }

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
