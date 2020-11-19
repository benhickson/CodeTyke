import React from 'react';
import SelectionBox from '../selectionBox/SelectionBox';
import Button from '../button/Button';
import ProgressBar from '../progressBar/ProgressBar';
import Modal from '../modal/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';

import './Styles.scss';

const LearningModule = ({setGameStatus}) => {
  const [currentQuestionId, setCurrentQuestionId] = React.useState(0);
  const [quizData, setQuizData] = React.useState({});
  const [showLoader, setShowLoader] = React.useState(false);
  const [showModal, setShowModal] = React.useState(false);
  const [selectedAnswers, setSelectedAnswers] = React.useState([]);
  const [incorrectAnswers, setIncorrectAnswers] = React.useState([]);
  const [submissionComplete, setSubmissionComplete] = React.useState(false);

  let currentQuestion = quizData.questionArr ? quizData.questionArr[currentQuestionId]: {};
  React.useEffect(()=>{
    getQuizData();
  },[]);

  const getQuizData=()=>{
    fetch("http://localhost:8080/problems")
      .then((res)=>{
        return res.json();
      }).then((data)=>{
        setQuizData(data);
      }).catch((err)=>{
        console.log(err);
      });
  }

  const handleSubmitOrNext=()=> {
    setShowLoader(true);
    setTimeout(function(){
      setIncorrectAnswers([]);
      setShowLoader(false);
      if (!submissionComplete) {
        if (submissionIsCorrect(currentQuestion, selectedAnswers)) {
          setSubmissionComplete(true);
        } else {
          setIncorrectAnswers(selectedAnswers);
          setSelectedAnswers([]);
        } 
      } else {
        setSelectedAnswers([]);
        setSubmissionComplete(false);
        if(currentQuestionId < quizData.totalQuestions-1){
          setCurrentQuestionId(currentQuestionId+1);
        } else {
          setCurrentQuestionId(0);
          setGameStatus({message: "Great Job! Play again.", loadIntro: true});
        }
      }
    }, 500 );
  }

  const submissionIsCorrect = (currentQuestion, selectedAnswers) => {
    for (let index = 0; index < currentQuestion.possibleAnswers.length; index++) {
      if (currentQuestion.possibleAnswers[index].isCorrect !== selectedAnswers.includes(index)) {
        return false;
      }
    }
    return true;
  }
  
  const handleCheckboxClick = (index) => {
    const newState = [...selectedAnswers];
    const indexIdx = newState.indexOf(index);
    if (indexIdx < 0) {
      newState.push(index);
    } else {
      newState.splice(indexIdx, 1);
    }
    setSelectedAnswers(newState);
  };

  let possibleAnswers = [];
  if(currentQuestion.possibleAnswers){
    possibleAnswers = currentQuestion.possibleAnswers.map((answer, index) => {
      return <SelectionBox id={index} key={index} answer={answer}
        checked={selectedAnswers.includes(index)}
        incorrect={incorrectAnswers.includes(index)}
        click={submissionComplete ? () => null : handleCheckboxClick}
        locked={submissionComplete}
      />
    })
  }

  const toggleAdditionalInfo = () => {
    setShowModal(!showModal);
  }

  return (
    <div className="learningModule">
      { currentQuestion.title &&
        <>
          <div className="learningModule--overlay"  onClick={toggleAdditionalInfo} style={{display: showModal ? "block" : "none"}}></div>
          <Modal showModal={showModal} setShowModal={setShowModal}>
            {currentQuestion.additionalInfo}
          </Modal>
          <ProgressBar totalQuestions={quizData.totalQuestions} id={currentQuestion.id} />
          <div className="learningModule--header">
            <div className="learningModule--title">
              { currentQuestion.title }
            </div>
            <div className="learningModule--additionalInfoIcon">
                <FontAwesomeIcon icon={faInfoCircle} onClick={toggleAdditionalInfo} size="lg" />
              </div>
            <div className="learningModule--subHeader">
              { currentQuestion.additionalInfo }
            </div>
          </div>

          <div className="learningModule--answerArea">
            <div className="learningModule--selections">
              { possibleAnswers }
            </div>
            <div className="learningModule--submitButtonContainer">
              <Button label={submissionComplete ? 'Next' : 'Submit'} handleSubmit={handleSubmitOrNext} showLoader={showLoader} hasIcons enabled={selectedAnswers.length > 0} />
            </div>
          </div>
        </>
      }
    </div>
  )
}

export default LearningModule;
