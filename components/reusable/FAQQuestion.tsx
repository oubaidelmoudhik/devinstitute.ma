interface FAQQuestionProps {
  id: number;
  question: string;
  answer: string;
}
export default function FAQQuestion({
  id,
  question,
  answer,
}: FAQQuestionProps) {
  return (
    <div className="accordion-item">
      <h2 className="accordion-header">
        <button
          className="accordion-button collapsed"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target={`#faqQuestion${id}`}
          aria-expanded="false"
          aria-controls={`faqQuestion${id}`}
        >
          {question}
        </button>
      </h2>
      <div
        id={`faqQuestion${id}`}
        // add 'show' classname if wanted to be open by default
        className="accordion-collapse collapse "
        data-bs-parent="#faqAccordion"
      >
        <div className="accordion-body pt-0">{answer}</div>
      </div>
    </div>
  );
}
