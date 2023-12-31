"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HTMLMonacoMarks = void 0;
const htmlhint_plus_1 = require("htmlhint-plus");
const utils_1 = require("./utils");
const defaultRuleset = {
    'tagname-lowercase': true,
    'attr-lowercase': true,
    'attr-invalid': true,
    'invalid-tag': true,
    'attr-value-double-quotes': true,
    'doctype-first': true,
    'tag-pair': true,
    'spec-char-escape': true,
    'id-unique': true,
    'src-not-empty': true,
    'attr-no-duplication': true,
    'title-require': true,
};
class HTMLMonacoMarks {
    constructor(html, ruleset = defaultRuleset, model) {
        this.html = html;
        this.ruleset = ruleset;
        this.linterResponse = this.lint();
        this.model = model;
    }
    lint() {
        return htmlhint_plus_1.HTMLHint.verify(this.html, this.ruleset);
    }
    getEditorMarks(monaco) {
        return this.linterResponse.map((issue) => ({
            startLineNumber: issue.line,
            startColumn: issue.col,
            endLineNumber: issue.line,
            endColumn: issue.evidence !== ''
                ? issue.col + issue.evidence.length
                : this.model !== undefined
                    ? this.model.getLineLength(issue.line)
                    : issue.col + 1,
            message: issue.message,
            severity: monaco.MarkerSeverity[(0, utils_1.capitalize)(issue.type)],
        }));
    }
    getLinterResponse() {
        return this.linterResponse;
    }
}
exports.HTMLMonacoMarks = HTMLMonacoMarks;
