import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../css/ListQuestionSet.css";

export interface IListQuestionSet {
  _id: string;
  title: string;
  questionCount: number;
}

function ListQuestionSet() {
  const [questionSets, setQuestionSet] = useState<IListQuestionSet[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      setIsLoading(false);
      return;
    }

    async function fetchData() {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/questions/set/list",
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );
        setQuestionSet(response?.data?.questionSet || []);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  if (isLoading) return <p className="loading-text">Loading...</p>;
  if (questionSets.length === 0)
    return <p className="loading-text">No question sets found.</p>;

  return (
    <div className="questionset-container">
      <h2>My Question Sets</h2>
      <ul className="questionset-list">
        {questionSets.map((question) => {
          const handleTakeQuiz = () => {
            navigate(`/questionset/${question._id}/attempt`);
          };
          return (
            <li key={question._id} className="questionset-item">
              <div className="questionset-info">
                <strong>{question.title}</strong> — {question.questionCount}{" "}
                questions
              </div>
              <button className="take-quiz-btn" onClick={handleTakeQuiz}>
                Take Quiz
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default ListQuestionSet;
