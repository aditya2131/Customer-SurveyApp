import React, { useState } from 'react';
import WelcomeScreen from './components/WelcomeScreen';
import SurveyScreen from './components/SurveyScreen';
import ConfirmationDialog from './components/ConfirmationDialog';
import ThankYouScreen from './components/ThankYouScreen';
import questions from './data/questions';
import './App.scss';

const App = () => {
  const [step, setStep] = useState(0); // Tracks the current step in the survey
  const [answers, setAnswers] = useState({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false); // Confirmation state

  const handleStart = () => setStep(1);

  const handleAnswer = (questionId, answer) => {
    setAnswers({
      ...answers,
      [questionId]: answer
    });
  };

  const handleNext = () => {
    if (step < questions.length) {
      setStep(step + 1);
    } else {
      setShowConfirmation(true); // Show confirmation after the last question
    }
  };

  const handlePrevious = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmit = () => {
    setIsCompleted(true); // Complete survey
  };

  if (isCompleted) {
    return <ThankYouScreen />;
  }

  return (
    <div className="app-container">
      {step === 0 ? (
        <WelcomeScreen onStart={handleStart} />
      ) : showConfirmation ? (
        <ConfirmationDialog onSubmit={handleSubmit} />
      ) : (
        <SurveyScreen
          question={questions[step - 1]}
          currentStep={step}
          totalSteps={questions.length}
          answer={answers[questions[step - 1].id] || ''}
          onAnswer={handleAnswer}
          onNext={handleNext}
          onPrevious={handlePrevious}
        />
      )}
    </div>
  );
};

export default App;
