import TextareaAutosize from 'react-textarea-autosize';

interface NoteTitleProps {
    value: string;
    onChange: (value: string) => void;
    onBlur?: () => void;
}

export function NoteTitle({ value, onChange, onBlur }: NoteTitleProps) {
    let textareaEl: HTMLTextAreaElement | null = null;

    return (
        <TextareaAutosize
            ref={(instance: any) => {
                textareaEl = instance;
            }}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onBlur={onBlur}
            onKeyDown={(e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    textareaEl?.blur();
                }
            }}
            placeholder="Nova página"
            style={{
                width: '100%',
                fontSize: '2.5rem',
                fontWeight: 'bold',
                resize: 'none',
                backgroundColor: 'transparent',
                color: 'var(--primary-text)',
                outline: 'none',
                border: 'none',
                boxShadow: 'none',
                padding: 0,
            }}
        />
    );
}