import React from 'react';

const SurveyScreen = ({ question, currentStep, totalSteps, onAnswer, onNext, onPrevious, answer }) => {
  const handleChange = (e) => {
    const value = e.target.value;
    onAnswer(question.id, value);
  };

  return (
    <div className="survey-screen">
      <div className="question-number">{`${currentStep}/${totalSteps}`}</div>
      <h3>{question.text}</h3>

      {/* For rating-type questions */}
      {question.type === 'rating' && (
        <div>
          {[...Array(question.maxValue)].map((_, i) => (
            <label key={i}>
              <input
                type="radio"
                name={`question-${question.id}`}
                value={i + 1}
                checked={answer === (i + 1).toString()}
                onChange={handleChange}
              />
              {i + 1}
            </label>
          ))}
        </div>
      )}

      {/* For text-type questions */}
      {question.type === 'text' && (
        <textarea
          value={answer}
          onChange={handleChange}
        />
      )}

      <div className="navigation-buttons">
        {currentStep > 1 && <button onClick={onPrevious}>Previous</button>}
        {currentStep < totalSteps && <button onClick={onNext}>Next</button>}
        {currentStep === totalSteps && <button onClick={onNext}>Submit</button>}
      </div>
    </div>
  );
};

export default SurveyScreen;
