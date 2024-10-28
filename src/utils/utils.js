import { diffLines } from "diff";

export function callParseNestedObject(parsedJson) {
    let outputDisplayString = '';
    function parseNestedObject(obj, indent = 0) {
        for (let key in obj) {
            if (typeof obj[key] === 'object') {
                if (Array.isArray(obj[key])) {
                    if (!obj[key][0]) {
                        outputDisplayString = outputDisplayString + `${'   '.repeat(indent)}${key}: []\n`;
                    }
                    else {
                        outputDisplayString = outputDisplayString + `${'   '.repeat(indent)}${key}: [\n`;                         
                        if (typeof obj[key] === 'object') {
                            outputDisplayString = outputDisplayString + `${'   '.repeat(indent+1)} {\n`;
                            parseNestedObject(obj[key][0], indent + 2);
                            outputDisplayString = outputDisplayString + `${'   '.repeat(indent+1)} }\n`;
                        }
                        outputDisplayString = outputDisplayString + `${'   '.repeat(indent)} ]\n`;
                    }
                }
                else {
                    outputDisplayString = outputDisplayString + `${'   '.repeat(indent)}${key}: {\n`;
                    parseNestedObject(obj[key], indent + 1);
                    outputDisplayString = outputDisplayString + `${'   '.repeat(indent)}}\n`;
                } 
            } else {
                outputDisplayString = outputDisplayString + `${'   '.repeat(indent)}${key}: ${typeof obj[key]}\n`;
            }
        }
    }
    parseNestedObject(parsedJson);
    return outputDisplayString;
}

export function callGetReducedObject(parsedJson) {
    let outputDisplayString = '';
    function getReducedObject(obj, indent = 0) {
        for (let key in obj) {
            if (typeof obj[key] === 'object') {
                if (Array.isArray(obj[key])) {
                    if (!obj[key][0]) {
                        outputDisplayString = outputDisplayString + `${'   '.repeat(indent)}"${key}": []\n`;
                    }
                    else {
                        outputDisplayString = outputDisplayString + `${'   '.repeat(indent)}"${key}": [\n`;                         
                        if (typeof obj[key] === 'object') {
                            outputDisplayString = outputDisplayString + `${'   '.repeat(indent+1)} {\n`;
                            getReducedObject(obj[key][0], indent + 2);
                            outputDisplayString = outputDisplayString + `${'   '.repeat(indent+1)} }\n${'   '.repeat(indent+1)}...\n`;
                        }
                        outputDisplayString = outputDisplayString + `${'   '.repeat(indent)} ]\n`;
                    }
                }
                else {
                    outputDisplayString = outputDisplayString + `${'   '.repeat(indent)}"${key}": {\n`;
                    getReducedObject(obj[key], indent + 1);
                    outputDisplayString = outputDisplayString + `${'   '.repeat(indent)}}\n`;
                } 
            } else {
                outputDisplayString = outputDisplayString + `${'   '.repeat(indent)}"${key}": "${obj[key]}"\n`;
            }
        }
    }
    getReducedObject(parsedJson);
    return outputDisplayString;
}

export function callParseNestedXMLObject(parsedJson) {
    let outputDisplayString = '';
    function parseNestedObject(obj, indent = 0) {
        for (let key in obj) {
            if (typeof obj[key] === 'object') {
                if (Array.isArray(obj[key])) {
                    if (!obj[key][0]) {
                        outputDisplayString = outputDisplayString + `${'   '.repeat(indent)}${key}: []\n`;
                    }
                    else if (obj[key].length === 1 && typeof obj[key][0] === 'string'){
                        outputDisplayString = outputDisplayString + `${'   '.repeat(indent)}${key}: string\n`;
                    }
                    else {
                        outputDisplayString = outputDisplayString + `${'   '.repeat(indent)}${key}: [\n`;                         
                        if (typeof obj[key] === 'object') {
                            outputDisplayString = outputDisplayString + `${'   '.repeat(indent+1)} {\n`;
                            parseNestedObject(obj[key][0], indent + 2);
                            outputDisplayString = outputDisplayString + `${'   '.repeat(indent+1)} }\n`;
                        }
                        outputDisplayString = outputDisplayString + `${'   '.repeat(indent)} ]\n`;
                    }
                }
                else {
                    outputDisplayString = outputDisplayString + `${'   '.repeat(indent)}${key}: {\n`;
                    parseNestedObject(obj[key], indent + 1);
                    outputDisplayString = outputDisplayString + `${'   '.repeat(indent)}}\n`;
                } 
            } else {
                outputDisplayString = outputDisplayString + `${'   '.repeat(indent)}${key}: ${typeof obj[key]}\n`;
            }
        }
    }
    parseNestedObject(parsedJson);
    return outputDisplayString;
}

export function callAssignObject(parsedJson) {
    const target = {};
    function assignObject (target, source) {
        Object.keys(source).forEach(key => {
                const s_val = source[key];
                target[key] = s_val && typeof s_val === 'object' && Array.isArray(s_val) && s_val[0]
                            ? assignObject(s_val[0], s_val[0])
                            : s_val && typeof s_val === 'object' && Array.isArray(s_val) && !s_val[0]
                            ? "array"
                            : s_val && typeof s_val === 'object' && !Array.isArray(s_val)
                            ? assignObject(s_val, s_val) 
                            : typeof s_val;
        })
        return target;
    }
    return assignObject(Object.create(target), parsedJson);
}

export function findDifference (dir, one, other) {
    let diff = diffLines(one, other);
    return diff.map(part => {
      let bgcolor = 'white';
      let txtcolor = 'black';
      if (part.removed) {
        bgcolor = 'red';
        txtcolor = 'white';
      }
      if (part.added) {
        bgcolor = 'green';
        txtcolor = 'white';
      }

      if (dir === 'left') {
        return (!part.added &&
            <div style={{ background: bgcolor, color: txtcolor, width: '100%'}}>
                {part.value}
            </div>)
      }
      else {
        return (!part.removed &&
            <div style={{ background: bgcolor, color: txtcolor,  width: '100%'}}>
                {part.value}
            </div>)
      }
    });
  };
