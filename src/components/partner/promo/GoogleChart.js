import React, {Component} from 'react';
import ReactDOM from 'react-dom';

const script = typeof window !== 'undefined' ? require('scriptjs') : (link, callback) => callback();

const googleChartLoader = {
    isLoaded: false,
    isLoading: false,
    initPromise: {},
    init: function init(packages, version) {
        console.log('init', packages, version);
        if (this.isLoading || this.isLoaded) {
            return this.initPromise;
        }
        this.isLoading = true;
        this.initPromise = new Promise((resolve) => {
            script('https://www.gstatic.com/charts/loader.js', () => {
                window.google.charts.load(version || 'current', {packages: packages || ['corechart'], language: 'ru'});
                window.google.charts.setOnLoadCallback(() => {
                    console.log('Chart Loaded');
                    this.isLoaded = true;
                    this.isLoading = false;
                    resolve();
                });
            });
        });
        return this.initPromise;
    }
};

class GoogleChart extends Component {

    static propTypes = {
        chartType: React.PropTypes.string.isRequired,
        containerId: React.PropTypes.string,
        data: React.PropTypes.array,
        height: React.PropTypes.oneOfType([
            React.PropTypes.string,
            React.PropTypes.number
        ]).isRequired,
        onError: React.PropTypes.func,
        width: React.PropTypes.oneOfType([
            React.PropTypes.string,
            React.PropTypes.number
        ]).isRequired
    };

    static defaultProps = {
        onError: () => {},
        options: {}
    };

    componentDidUpdate(nextProps, nextState) {
        const {data: dataTable, options:options} = this.props;
        this.redraw(dataTable, options);
    }

    redraw(dataTable, options) {
        if (this.chartWrapper) {
            this.chartWrapper.setOptions(options);
            this.chartWrapper.setDataTable(dataTable);
            this.chartWrapper.draw(ReactDOM.findDOMNode(this));
        }
    }

    componentDidMount() {
        googleChartLoader.init().then(() => this.drawChart(this.props)).catch(this.props.onError);
    }

    drawChart = (props) => {
        const {containerId, chartType, data: dataTable, options} = props;
        if (!dataTable) {
            return;
        }
      if (global.google && global.google.visualization) {
            this.chartWrapper = new global.google.visualization.ChartWrapper({
                chartType,
                containerId,
                dataTable,
                options
            });
          this.chartWrapper.draw(ReactDOM.findDOMNode(this));
      }
    };

    render() {
        const {height, width} = this.props;
        return React.createElement('div', {style: {height, width}});
    }
}

export default GoogleChart;