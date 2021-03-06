const rules = {
  "fix": true,
  "plugins": [
    "react"
  ],
  "extends": ["airbnb", "plugin:react/recommended"],
  "env": {
    "browser": true,
    "node": true,
    "es6": true
  },
  "parser": "babel-eslint",
  parserOptions: {
    sourceType: "module",
    "ecmaFeatures": {
      "arrowFunctions": true,
      "binaryLiterals": true,
      "blockBindings": true,
      "classes": true,
      "defaultParams": true,
      "destructuring": true,
      "forOf": true,
      "generators": true,
      "modules": true,
      "objectLiteralComputedProperties": true,
      "objectLiteralDuplicateProperties": true,
      "objectLiteralShorthandMethods": true,
      "objectLiteralShorthandProperties": true,
      "octalLiterals": true,
      "regexUFlag": true,
      "regexYFlag": true,
      "spread": true,
      "superInFunctions": true,
      "templateStrings": true,
      "unicodeCodePointEscapes": true,
      "globalReturn": true,
      "jsx": true
    }
  },
  "rules": {
    "arrow-body-style": [2, "as-needed"],
    "no-underscore-dangle": [2, { "allow": ["_id"] }],
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }]
  }
};

module.exports = rules;
