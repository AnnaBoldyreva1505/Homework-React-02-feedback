import React, { Component } from 'react';
import { Notification } from './Notification/Notification';
import { Statistics } from './Statistics/Statistics';
import { Section } from './Section/Section';
import { FeedbackOptions } from './FeedbackOptions/FeedbackOptions';

export class App extends Component {
  state = {
    good: 0,
    neutral: 0,
    bad: 0,
  };

  handleIncrement = event => {
    const btnName = event.target.name;
    this.setState(prevState => ({
      [btnName]: prevState[btnName] + 1,
    }));
  };

  countTotalFeedback = () => {
    const { good, neutral, bad } = this.state;
    return good + neutral + bad;
  };

  countPositiveFeedbackPercentage = () => {
    const positiveFeedbackPercentage = Math.round(
      (this.state.good / this.countTotalFeedback()) * 100
    );

    return positiveFeedbackPercentage;
  };

  render() {
    const { good, neutral, bad } = this.state;
    const options = Object.keys(this.state);

    return (
      <>
        <Section title="Please leave feedback">
          <FeedbackOptions
            options={options}
            onLeaveFeedback={this.handleIncrement}
          />
        </Section>

        <Section title="Statistics">
          {this.countTotalFeedback() ? (
            <Statistics
              good={good}
              neutral={neutral}
              bad={bad}
              total={this.countTotalFeedback()}
              positivePercentage={this.countPositiveFeedbackPercentage()}
            ></Statistics>
          ) : (
            <Notification message="There is no feedback"></Notification>
          )}
        </Section>
      </>
    );
  }
}
