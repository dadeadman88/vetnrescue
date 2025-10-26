import React from 'react';
import HealthCoachingDetails from '../../components/atoms/HealthCoachingDetails';
import { ScrollView } from 'react-native';

const GoalDetails = () => {
  const title = "Health Coaching\nPackages and Pricing";
  const subtitle = "Starting with an Initial Consultation";
  const details = [
    "Every health coaching journey begins with an initial consultation session, priced at $125. This 1-hour session sets the foundation for your personalized health coaching plan.",
    "Each follow-up session lasts up to 35 minutes, focusing on your health goals and strategies to achieve them.",
    "One-hour follow-up sessions are available at $125 per 1-hour session for individuals who need more personalized attention."
  ];

  return (
    <HealthCoachingDetails
      title={title}
      subtitle={subtitle}
      details={details}
    />
  );
};

export default GoalDetails;
