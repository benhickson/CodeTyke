import React from 'react';
import SelectionBox from '../selectionBox/SelectionBox';
import Button from '../button/Button';
import ProgressBar from '../ProgressBar/ProgressBar';

import './Styles.scss';

const LearningModule = ({setGameStatus}) => {
  const [currentQuestionId, setCurrentQuestionId] = React.useState(0);
  const [quizData, setQuizData] = React.useState({});
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

  const handleSubmit=()=> {
    if(currentQuestionId < quizData.totalQuestions-1){
      setCurrentQuestionId(currentQuestionId+1);
    } else {
      setCurrentQuestionId(0);
      setGameStatus({message: "Great Job! Play again.", loadIntro: true});
    }
  }
  let possibleAnswers = [];
  if(currentQuestion.possibleAnswers){
    possibleAnswers = currentQuestion.possibleAnswers.map((answer, index) => {
      return <SelectionBox id={index} key={index} answer={answer} />
    })
  }

  const progressBarText=()=> {
    return progressBarCompletedPercent() + '% Complete';
  }
  const progressBarCompletedPercent=()=> {
    console.log('calculating percent...');
    console.log(quizData, currentQuestionId);
    if (quizData.totalQuestions) {
      return Math.round(((currentQuestionId + 1) / (quizData.totalQuestions + 1)) * 100);
    } else {
      return 0;
    }
  }


  return (
    <div className="learningModule">
      <ProgressBar text={ progressBarText() } completedPercent={ progressBarCompletedPercent() } />
      { currentQuestion.title &&
        <>
          <div className="learningModule--header">
            <div className="learningModule--title">
              { currentQuestion.title }
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
              <Button label="Submit" handleSubmit={ handleSubmit } />
            </div>
          </div>
        </>
      }
    </div>
  )
}

export default LearningModule;
