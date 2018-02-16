module.exports = {
	env: {
		browser: true,
		commonjs: true,
		es6: true
	},
	extends: ["eslint:recommended", "react-app", "plugin:jsx-a11y/recommended"],
	parser: "babel-eslint",
	parserOptions: {
		ecmaFeatures: {
			experimentalObjectRestSpread: true,
			jsx: true
		},
		sourceType: "module"
	},
	plugins: ["react", "graphql", "jsx-a11y", "styled-components-config"],
	rules: {
		indent: ["error", "tab"],
		"linebreak-style": ["error", "unix"],
		quotes: ["error", "double"],
		semi: ["error", "always"],
		"graphql/template-strings": [
			"error",
			{
				// Import default settings for your GraphQL client. Supported values:
				// 'apollo', 'relay', 'lokka', 'literal'
				env: "apollo",

				// Import your schema JSON here
				schemaJson: require("./schema.json")

				// OR provide absolute path to your schema JSON
				// schemaJsonFilepath: path.resolve(__dirname, './schema.json'),

				// OR provide the schema in the Schema Language format
				// schemaString: printSchema(schema),

				// tagName is gql by default
			}
		],
		"styled-components-config/rule-name": 2,
		"react/jsx-uses-react": ["error"],
		"react/jsx-uses-vars": ["error"],
		"react/no-typos": ["error"],
		"react/jsx-wrap-multilines": "error",
		"react/jsx-key": "error",
		"react/no-find-dom-node": "error",
		"react/prefer-es6-class": "error",
		"react/require-render-return": "error",
		"react/void-dom-elements-no-children": "error",
		"react/react-in-jsx-scope": "error",
		"react/jsx-no-comment-textnodes": "error",
		"react/jsx-no-duplicate-props": "error",
		"react/no-deprecated": "error",
		"import/no-unresolved": "error",
		"import/named": "error",
		"import/namespace": "error",
		"import/default": "error",
		"import/export": "error"
	}
};
