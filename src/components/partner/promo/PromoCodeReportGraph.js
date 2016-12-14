import React, {Component, PropTypes} from 'react';
import GoogleChart from './GoogleChart'

class PromoCodeReportGraph extends Component {
    constructor(params) {
        super(params);
    }
    render() {
        const {data, options} =  this.props;
        return (
                <GoogleChart  type='AnnotationChart' data={ data } width='100%' height='300px' options={ {} } {...options}/>
          );
    }
}

export default PromoCodeReportGraph