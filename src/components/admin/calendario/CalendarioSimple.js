import React, { Component } from 'react';
import { Button, ButtonGroup } from 'reactstrap';

import 'react-dates/initialize';
import {
  DateRangePicker,
  SingleDatePicker,
  DayPickerRangeController,
  isInclusivelyBeforeDay
} from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import moment from 'moment';

moment.locale('es');

class CalendarioSimple extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: null,
      endDate: null
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(date) {
    this.setState({
      startDate: date
    });
  }
  render() {
    return (
      <section>
        <div className="izquierda">
          <SingleDatePicker
          placeholder="Seleccione:"
            date={this.state.date} // momentPropTypes.momentObj or null
            onDateChange={date => {
              this.setState({ date });
              if (this.props.getDates) {
                this.props.getDates(date);
              }
            }} // PropTypes.func.isRequired
            focused={this.state.focused} // PropTypes.bool
            onFocusChange={({ focused }) => this.setState({ focused })} // PropTypes.func.isRequired
            id="your_unique_id" // PropTypes.string.isRequired,
            numberOfMonths={1}
            isOutsideRange={day => {
              return this.props.atras
                ? !isInclusivelyBeforeDay(day, moment())
                : isInclusivelyBeforeDay(day, moment());
            }}
          />
        </div>
      </section>
    );
  }
}

export default CalendarioSimple;
