import React, { useState } from "react";
import type { IAttempQuestionForm } from "../../pages/QuestionSet/AttemptQuizPage";
import {
  FormProvider,
  useFieldArray,
  useForm,
  useFormContext,
} from "react-hook-form";
import axios from "axios";
import "../../css/AttemptQuizForm.css"; 

export interface IAttemptQuizFinalData {
  questionSet: string;
  responses: {
    questionId: string;
    selectedChoicesIds: string[];
  }[];
}

function AttemptQuizForm({
  questionSet,
}: {
  questionSet: IAttempQuestionForm;
}) {
  const [result, setResult] = useState(null);

  const defaultValues: IAttempQuestionForm = { ...questionSet };
  const methods = useForm({ defaultValues });
  const { watch, register, handleSubmit } = methods;

  const onSubmitHandler = (data: IAttempQuestionForm) => {
    const accessToken = localStorage.getItem("accessToken");

    const finalData: IAttemptQuizFinalData = {
      questionSet: data?._id,
      responses: data?.questions?.map((question) => {
        return {
          questionId: question?._id,
          selectedChoicesIds: question?.choices
            ?.filter((choice) => choice?.selected)
            ?.map((ch) => ch?._id),
        };
      }),
    };

    axios
      .post("http://localhost:3000/api/questions/answer/attempt", finalData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        alert("Answer Set Updated Successfully");
        setResult(res.data.data);
      })
      .catch((err) => {});
  };

  if (result) {
    return (
      <div className="quiz-result-container">
        <h1 className="quiz-result-title">Result</h1>
      </div>
    );
  }

  return (
    <div className="attempt-quiz-container">
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmitHandler)} className="attempt-quiz-form">
          <div className="quiz-title-input">
            <label>Enter Title</label>
            <input {...register("title")} placeholder="Enter Title" />
          </div>
          <CreateQuestions />
          <button type="submit" className="submit-quiz-btn">
            Submit Answer
          </button>
        </form>
      </FormProvider>
    </div>
  );
}

function CreateQuestions() {
  const { control } = useFormContext<IAttempQuestionForm>();
  const { fields } = useFieldArray({ control, name: "questions" });

  return (
    <div className="questions-container">
      <h1 className="questions-heading">Questions</h1>
      {fields?.map((field, index) => (
        <div key={index} className="question-block">
          <p className="question-text">{field?.questionText}</p>
          <CreateChoices questionIndex={index} />
        </div>
      ))}
    </div>
  );
}

function CreateChoices({ questionIndex }: { questionIndex: number }) {
  const { register, control } = useFormContext<IAttempQuestionForm>();
  const { fields } = useFieldArray({ control, name: `questions.${questionIndex}.choices` });

  return (
    <div className="choices-container">
      {fields?.map((field, index) => (
        <div key={index} className="choice-item">
          <input
            type="checkbox"
            {...register(`questions.${questionIndex}.choices.${index}.selected`)}
          />
          <p className="choice-text">{field?.text}</p>
        </div>
      ))}
    </div>
  );
}

export default AttemptQuizForm;
