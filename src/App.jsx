
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import data from "./data/questions.json";

export default function SAPQuizApp() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState([]);
  const [showExplanation, setShowExplanation] = useState(false);
  const question = data[current];

  const handleSelect = (index) => {
    if (question.choice_type === "single") {
      setSelected([index]);
    } else {
      setSelected(prev => prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]);
    }
  };

  const checkAnswer = () => {
    setShowExplanation(true);
  };

  const nextQuestion = () => {
    setSelected([]);
    setShowExplanation(false);
    setCurrent(prev => (prev + 1 < data.length ? prev + 1 : 0));
  };

  const progress = ((current + 1) / data.length) * 100;

  return (
    <div className="p-4 max-w-md mx-auto space-y-4">
      <Progress value={progress} />
      <div className="text-sm text-gray-600">Kategorie: {question.category} ({current + 1}/{data.length})</div>
      <Card>
        <CardContent>
          <h2 className="text-xl font-bold mb-2">{question.question}</h2>
          <div className="space-y-2">
            {question.answers.map((ans, idx) => (
              <div
                key={idx}
                className={\`p-2 border rounded cursor-pointer \${selected.includes(idx) ? 'bg-blue-100' : ''}\`}
                onClick={() => handleSelect(idx)}
              >
                {String.fromCharCode(65 + idx)}. {ans}
              </div>
            ))}
          </div>
          {!showExplanation ? (
            <Button className="mt-4 w-full" onClick={checkAnswer}>
              Antwort überprüfen
            </Button>
          ) : (
            <div className="mt-4 space-y-2">
              <div className="text-green-600 font-medium">
                Erklärung: {question.explanation}
              </div>
              <Button className="w-full" onClick={nextQuestion}>Nächste Frage</Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
