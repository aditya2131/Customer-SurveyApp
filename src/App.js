import React, { useState, useEffect } from 'react';
import WelcomeScreen from './components/WelcomeScreen';
import SurveyScreen from './components/SurveyScreen';
import ConfirmationDialog from './components/ConfirmationDialog';
import ThankYouScreen from './components/ThankYouScreen';
import questions from './data/questions';
import './App.scss';

const App = () => {
  const [step, setStep] = useState(0); // Tracks the current step in the survey
  const [answers, setAnswers] = useState(() => {
    // Load existing answers from localStorage on mount
    const savedAnswers = localStorage.getItem('surveyAnswers');
    return savedAnswers ? JSON.parse(savedAnswers) : {};
  });
  const [isCompleted, setIsCompleted] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false); // Confirmation state

  // Save answers to localStorage when they change
  useEffect(() => {
    localStorage.setItem('surveyAnswers', JSON.stringify(answers));
  }, [answers]);

  const handleStart = () => setStep(1);

  const handleAnswer = (questionId, answer) => {
    const newAnswers = {
      ...answers,
      [questionId]: answer,
    };
    setAnswers(newAnswers);
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
    localStorage.setItem('surveyCompleted', 'true'); // Mark survey as completed in localStorage
  };

  // Check if the survey has been completed previously
  useEffect(() => {
    const completed = localStorage.getItem('surveyCompleted');
    if (completed === 'true') {
      setIsCompleted(true);
    }
  }, []);

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
