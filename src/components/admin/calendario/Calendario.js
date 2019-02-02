import React, { Component } from 'react';
import { Button, ButtonGroup } from 'reactstrap';

import 'react-dates/initialize';
import { DateRangePicker, isInclusivelyBeforeDay } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import moment from 'moment';

moment.locale('fr');

class Calendario extends Component {
  constructor(props) {
    super(props);

    moment.locale('fr');
    this.state = {
      startDate: null,
      endDate: null,
      radio: 0
    };
    this.handleChange = this.handleChange.bind(this);
    this.radio = this.radio.bind(this);
  }

  radio(i) {
    this.setState({ radio: i });
  }

  handleChange(date) {
    this.setState({
      startDate: date
    });
  }
  render() {
    return (
      <section>
        <div className={this.props.clase && this.props.clase}>
          {this.props.botones && (
            <ButtonGroup className="d-inline d-lg-none">
              <Button
                className={
                  (this.props.colorboton
                    ? this.props.colorboton
                    : 'botonAmarillo') + ' claseCalendario'
                }
                active={this.state.radio === 5}
                onClick={() => {
                  this.radio(5);
                  this.props.hoy();
                }}
              >
                HOY
              </Button>
              <Button
                className={
                  (this.props.colorboton
                    ? this.props.colorboton
                    : 'botonAmarillo') + ' claseCalendario'
                }
                active={this.state.radio === 6}
                onClick={() => {
                  this.radio(6);
                  this.props.semana();
                }}
              >
                ESTA SEMANA
              </Button>
              <Button
                className={
                  (this.props.colorboton
                    ? this.props.colorboton
                    : 'botonAmarillo') + ' claseCalendario'
                }
                active={this.state.radio === 7}
                onClick={() => {
                  this.radio(7);
                  this.props.ayer();
                }}
              >
                ESTE MES
              </Button>
            </ButtonGroup>
          )}
          {this.props.botones && (
            <ButtonGroup className="d-none d-lg-inline">
              <Button
                className={
                  (this.props.colorboton
                    ? this.props.colorboton
                    : 'botonAmarillo') + ' claseCalendario'
                }
                active={this.state.radio === 1}
                onClick={() => {
                  this.radio(1);
                  this.props.hoy();
                }}
              >
                HOY
              </Button>
              <Button
                className={
                  (this.props.colorboton
                    ? this.props.colorboton
                    : 'botonAmarillo') + ' claseCalendario'
                }
                active={this.state.radio === 2}
                onClick={() => {
                  this.radio(2);
                  this.props.ayer();
                }}
              >
                AYER
              </Button>
              <Button
                className={
                  (this.props.colorboton
                    ? this.props.colorboton
                    : 'botonAmarillo') + ' claseCalendario'
                }
                active={this.state.radio === 3}
                onClick={() => {
                  this.radio(3);
                  this.props.semana();
                }}
              >
                ESTA SEMANA
              </Button>
              <Button
                className={
                  (this.props.colorboton
                    ? this.props.colorboton
                    : 'botonAmarillo') + ' claseCalendario'
                }
                active={this.state.radio === 4}
                onClick={() => {
                  this.radio(4);
                  this.props.mes();
                }}
              >
                ESTE MES
              </Button>
            </ButtonGroup>
          )}{' '}
          {this.props.rango && (
            <DateRangePicker
              startDatePlaceholderText="Desde"
              endDatePlaceholderText="Hasta"
              isOutsideRange={day => !isInclusivelyBeforeDay(day, moment())}
              startDate={this.state.startDate} // momentPropTypes.momentObj or null,
              startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
              endDate={this.state.endDate} // momentPropTypes.momentObj or null,
              endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
              onDatesChange={({ startDate, endDate }) => {
                if (this.props.getDates) {
                  this.props.getDates(startDate, endDate);
                }
                this.setState({ startDate, endDate });
                console.log('Cambio');
              }} // PropTypes.func.isRequired,
              focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
              onFocusChange={focusedInput => {
                this.radio(0);
                this.setState({ focusedInput });
              }} // PropTypes.func.isRequired,
            />
          )}
        </div>
      </section>
    );
  }
}

export default Calendario;
