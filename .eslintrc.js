module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "commonjs": true,
        "node": true,
        "jasmine": true
    },
    "extends": "eslint:recommended",
    "parser": "babel-eslint",
    "parserOptions": {
        "sourceType": "module",
        "ecmaFeatures": {
          "jsx": true
        },
        "ecmaVersion": 8
    },
    "rules": {
        "indent": ["error", 2],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": ["error", "never"],
        "no-console": 0,
        "no-unused-vars": [
            0
        ]
    }
};
