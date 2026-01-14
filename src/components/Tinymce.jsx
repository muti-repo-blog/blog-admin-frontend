import { Editor } from '@tinymce/tinymce-react';
import '../css/tinymce.css';

export default function Tinymce(props) {

  return (
    <div className='editor-wrapper'>
      <Editor
        apiKey={import.meta.env.VITE_TINYMCE_API_KEY}
        onInit={(evt, editor) => (props.editorRef.current = editor)}
        init={{
          placeholder: 'Your Content Here...',
          height: '50vh',
          menubar: false,
          plugins:
            "advlist autolink lists link image charmap preview anchor " +
            "searchreplace visualblocks code fullscreen " +
            "insertdatetime media table help wordcount",
          toolbar:
            "undo redo | formatselect | bold italic backcolor | " +
            "alignleft aligncenter alignright alignjustify | " +
            "bullist numlist outdent indent | removeformat | help",
          content_style:
            "body { font-family: Helvetica, Arial, sans-serif; font-size: 16px; background-color: #C4BFB5; color: #2F362F; }"
        }}
      />
    </div>

  );
}