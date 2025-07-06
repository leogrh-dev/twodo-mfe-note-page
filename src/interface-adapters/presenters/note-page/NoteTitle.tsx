import TextareaAutosize from 'react-textarea-autosize';

interface NoteTitleProps {
    value: string;
    onChange: (value: string) => void;
}

export function NoteTitle({ value, onChange }: NoteTitleProps) {
    let textareaEl: HTMLTextAreaElement | null = null;

    return (
        <TextareaAutosize
            className="note-title-textarea"
            ref={(instance: any) => { textareaEl = instance; }}
            placeholder="Nova página"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={(e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    textareaEl?.blur();
                }
            }}
        />
    );
}