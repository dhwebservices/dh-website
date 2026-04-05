export default function CareerQuestionField({ question, value, onChange }) {
  const commonProps = {
    className: 'field-inp',
    value: value || '',
    onChange: (event) => onChange(question.id, event.target.value),
  }

  return (
    <div>
      <label className="field-label">{question.label}{question.required ? ' *' : ''}</label>
      {question.type === 'select' ? (
        <select {...commonProps}>
          <option value="">Select...</option>
          {(question.options || []).map((option) => <option key={option} value={option}>{option}</option>)}
        </select>
      ) : question.type === 'text' ? (
        <input {...commonProps} type="text" />
      ) : (
        <textarea {...commonProps} rows={4} style={{ resize: 'vertical', lineHeight: 1.6 }} />
      )}
      {question.help ? <div style={{ fontSize: 12, color: 'var(--light)', marginTop: 6 }}>{question.help}</div> : null}
    </div>
  )
}
