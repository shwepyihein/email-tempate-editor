import React, { useState, useRef } from 'react';

import EmailEditor from 'react-email-editor';
import { Button, Input } from 'antd';

const App = () => {
  const emailEditorRef = useRef();

  const [inputData, setInputData] = useState('');
  const [outputData, setOuputData] = useState('');
  const [designbody, setDesignBody] = useState('');

  const onload = (data) => {
    if (data) {
      const design = data;
      emailEditorRef.current.editor.loadDesign(design);
    }
  };
  const handleChange = (e) => {
    console.log(e.target.value);
    const data = JSON.parse(e.target.value);
    setInputData(data);
  };

  const InputHandle = () => {
    setDesignBody('');
    setOuputData('');
    onload(inputData);
  };

  const handleSaveSubmit = (e) => {
    e.preventDefault();
    emailEditorRef.current.editor.exportHtml((data) => {
      const { design, html } = data;
      console.log(design);
      setOuputData(html);

      setDesignBody(JSON.stringify(design));
      /* if (saveORTest) {
        const body = {
          templateHtml: html,
          email_subject: saveData.email_subject,
          template_name: saveData.template_name,
          email_text: JSON.stringify(design),
        };
        DataService.put(`emails/update-email`, body)
          .then((res) => {
            setData({ ...data, LoadingSubmit: false });
            popup();
            setTimeout(() => {
              history.push('/admin/email');
            }, 2000);
          })
          .catch((err) => {
            setData({ ...data, LoadingSubmit: false });
          });
      } else {
        const body = {
          text_json: JSON.stringify(design),
          templateHtml: html,
          email: testData.email,
          subject: testData.test_subject,
        };
        DataService.post(`emails/test-email`, body)
          .then((res) => {
            popup();
            setTimeout(() => {
              setData({ ...data, LoadingSubmit: false });
            }, 2000);
          })
          .catch((err) => {
            setData({ ...data, LoadingSubmit: false });
          });
      } */
    });
  };

  return (
    <>
      <div>
        <div
          style={{ maxWidth: '1140px', padding: '10px 30px', margin: '0 auto' }}
        >
          <Input.TextArea
            style={{
              width: '100%',
              padding: '10px 30px',
              margin: '0 auto',
              height: '200px',
            }}
            onChange={handleChange}
          />
          <div>
            <Button onClick={InputHandle}>Input Design</Button>
          </div>
        </div>
        <div>
          <div>
            <EmailEditor ref={emailEditorRef} onLoad={onload} />
          </div>
          <div
            style={{ textAlign: 'end', display: 'flex', padding: '10px 30px' }}
          >
            <Button
              type='primary'
              style={{ maxWidth: '200px' }}
              onClick={handleSaveSubmit}
            >
              Output design
            </Button>
          </div>
        </div>
        <div
          style={{
            maxWidth: '1140px',
            padding: '10px 30px',
            margin: '20px auto',
          }}
        >
          <Input.TextArea
            style={{
              width: '100%',
              padding: '10px 30px',
              margin: '0 auto',
              height: '200px',
            }}
            value={outputData}
          />

          <div>design Body</div>
          <Input.TextArea
            style={{
              width: '100%',
              padding: '10px 30px',
              margin: '0 auto',
              height: '200px',
            }}
            value={designbody}
          />
        </div>
      </div>
    </>
  );
};

export default App;
