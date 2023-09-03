import React, { useRef } from 'react';

import Editor from '@monaco-editor/react';
import HTMLMonacoLinter from 'monaco-html-linter-plugin';

export default function App() {
    const editorRef = useRef(null);

    function handleEditorDidMount(editor: any, monaco: any) {
        const linter = new HTMLMonacoLinter(editor as any, monaco as any, {
            'doctype-first': false,
            'spec-char-escape': false,
            'tag-pair': true,
            'attr-lowercase': true,
            'invalid-tag': true,
            'attr-unsafe-chars': true,
            'attr-no-duplication': true,
            'attr-no-unnecessary-whitespace': true,
            'attr-invalid': true,
            // 'empty-tag-not-self-closed': true,
        });
        linter.watch();
        editorRef.current = editor;
    }

    return (
        <main className="bg-black h-[100vh]">
            <h1 className="text-4xl text-white p-14 text-center">Playground</h1>
            <div className="p-20">
                <Editor
                    width="100%"
                    height="50vh"
                    theme="vs-dark"
                    defaultLanguage="html"
                    defaultValue="<divx>h</divx>"
                    onMount={handleEditorDidMount}
                />
            </div>
        </main>
    );
}
