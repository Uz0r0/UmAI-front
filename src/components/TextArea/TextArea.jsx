import styles from '../TextArea/TextArea.module.css';
import TextareaAutosize from 'react-textarea-autosize';

const TextArea = ({ placeholder, onChange, value, rows, onEnter }) => {
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); 
      if (onEnter) onEnter(); 
    }
  };

  return (
    <div className={styles.textAreaWrapper}>
      <TextareaAutosize
        className={styles.textArea}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onKeyDown={handleKeyDown}
        minRows={rows}
      />
    </div>
  );
};

export default TextArea;
