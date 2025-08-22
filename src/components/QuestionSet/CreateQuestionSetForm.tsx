import axios from "axios";
import {
  FormProvider,
  useFieldArray,
  useForm,
  useFormContext,
} from "react-hook-form";
import "../../css/CreateQuestionSetForm.css";

export interface QuestionSetForm {
  title: string;
  questions: {
    questionText: string;
    choices: { text: string; label: string; correctAnswer: boolean }[];
  }[];
}

function CreateQuestionSetForm() {
  const defaultValues: QuestionSetForm = {
    title: "",
    questions: [{ questionText: "", choices: [] }],
  };

  const methods = useForm({ defaultValues });
  const { watch, register, handleSubmit } = methods;

  const onSubmitHandler = (data: QuestionSetForm) => {
    const accessToken = localStorage.getItem("accessToken");
    axios
      .post("http://localhost:3000/api/admin/questionset/create", data, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then(() => alert("Question Set Created Successfully"))
      .catch((err) => console.error(err));
  };

  return (
    <div className="question-set-container">
      <h1>Create New Question Set</h1>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmitHandler)}>
          <div className="form-group">
            <label>Title</label>
            <input
              {...register("title")}
              placeholder="Enter Title"
              className="form-input"
            />
          </div>

          <QuestionsSection />

          <button type="submit" className="submit-btn">
            Create Question Set
          </button>
        </form>
      </FormProvider>
    </div>
  );
}

function QuestionsSection() {
  const { register, control } = useFormContext<QuestionSetForm>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "questions",
  });

  return (
    <div className="questions-section">
      <h2>Questions</h2>
      {fields.map((field, index) => (
        <div key={field.id} className="question-card">
          <input
            {...register(`questions.${index}.questionText`)}
            placeholder={`Enter Question ${index + 1}`}
            className="form-input question-input"
          />
          <div className="question-actions">
            <button type="button" onClick={() => remove(index)}>
              Remove Question
            </button>
          </div>

          <ChoicesSection questionIndex={index} />
        </div>
      ))}

      <button
        type="button"
        className="add-btn"
        onClick={() => append({ questionText: "", choices: [] })}
      >
        + Add Question
      </button>
    </div>
  );
}

function ChoicesSection({ questionIndex }: { questionIndex: number }) {
  const { register, control } = useFormContext<QuestionSetForm>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: `questions.${questionIndex}.choices`,
  });

  return (
    <div className="choices-section">
      {fields.map((field, index) => (
        <div key={field.id} className="choice-row">
          <input
            type="checkbox"
            {...register(
              `questions.${questionIndex}.choices.${index}.correctAnswer`
            )}
          />
          <input
            {...register(`questions.${questionIndex}.choices.${index}.text`)}
            placeholder={`Choice ${index + 1}`}
            className="form-input choice-input"
          />
          <button type="button" onClick={() => remove(index)}>
            Remove Choice
          </button>
        </div>
      ))}

      <button
        type="button"
        className="add-btn"
        onClick={() =>
          append({ label: fields.length.toString(), text: "", correctAnswer: false })
        }
      >
        + Add Choice
      </button>
    </div>
  );
}

export default CreateQuestionSetForm;
