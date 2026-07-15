const fs = require('fs'); 
let css = fs.readFileSync('src/styles/global.css', 'utf-8'); 
css = css.replace('button { -webkit-tap-highlight-color: transparent; }\r\njustify-content: space-between;', 'button { -webkit-tap-highlight-color: transparent; }\r\n.search-item {\r\n  display: flex;\r\n  justify-content: space-between;'); 
css = css.replace('color: var(--muted);\r\n}\r\n  border: none;\r\n  display: flex;', 'color: var(--muted);\r\n}\r\n.back-to-top {\r\n  border: none;\r\n  display: flex;'); 
fs.writeFileSync('src/styles/global.css', css);
