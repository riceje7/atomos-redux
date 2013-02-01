var reviews = {
	level0: {
		question0: {
			msg: "Question 0:\nWhat is the name of the thing used to issue commands to ATOMOS?\n\n    a. The Commander\n    b. The Console\n    c. The Command Module\n    d. The Master Controller Unit\n    e. None of the above\n\nEnter the letter of your choice below...",
			answer: "b"
		},
		question1: {
			msg: "Question 1:\nWhat COMMAND will display all of the commands available to the player?\n\nEnter your answer in the console, like you were actually calling the command. (Hint: Remember the structure of a method call, what must they all have a set of, and what must they all end with?)",
			answer: "help();"
		},
		question2: {
			msg: "Question 2:\nWhat COMMAND is used to tell ATOMOS you are finished reading a message?\n\nEnter your answer in the console, like you were actually calling the command. (Hint: It's a term for telling something they can leave.)",
			answer: "dismiss();"
		}
	},
	level1: {
		question0: {
			msg: "Question 0:\nWhich of the following is a BOOLEAN value?\n\n    a. undefined\n    b. null\n    c. 0\n    d. true\n    e. All of the Above\n",
			answer: "e"
		},
		question1: {
			msg: "Question 1:\nWhat is a NULL value defined as?\n\n    a. an 'empty' value\n    b. It is not defined\n    c. 42\n    d. an 'unknown' value\n    e. None of the Above\n",
			answer: "a"
		},
		question2: {
			msg: "Question 2:\nWhat would the value of myBool be in the following statement:\n          var myBool = new Boolean('false');\n\n    a. undefined\n    b. null\n    c. true\n    d. false\n    e. None of the above\n",
			answer: "c"
		},
		question3: {
			msg: "Question 3:\nWhat would be returned by the following operation:\n          var x = 5/0;\n\n    a. NaN\n    b. 0\n    c. NEGATIVE_INFINITY\n    d. POSITIVE_INFINITY\n    e. None of the Above\n",
			answer: "d"
		},
		question4: {
			msg: "Question 4:\nWhich of the following would produce a NaN return value?\n\n    a. var x = 3/4;\n    b. var x = 3/0;\n    c. var x = 3/-0;\n    d. var x = 'hello world';\n    e. var x = POSITIVE_INFINITY+NEGATIVE_INFINITY;\n",
			answer: "c"
		},
		question5: {
			msg: "Question 5:\nWhich PRIMITIVE DATATYPE should be used to transfer non-numeric data\n\n    a. STRING\n    b. BOOLEAN\n    c. UNDEFINED\n    d. NULL\n    e. NUMBER\n",
			answer: "a"
		},
		question6: {
			msg: "Question 6:\nHow many special NUMBERS are there in the Javascript NUMBER OBJECT?\n\n    a. 2\n    b. 3\n    c. 4\n    d. 5\n    e. 6\n    ",
			answer: "d"
		}
	},
	level2: {
		question0: {
			msg: "Question 0:\n Define a variable that has a STRING value.",
			answer: /^var\s+\w+\s?=\s?"\w*";$/
		},
		question1: {
			msg: "Question 1:\n Define a variable that has a FLOAT value.",
			answer: /^var\s+\w+\s?=\s?\d+.?\d*;$/
		},
		question2: {
			msg: "Question 2:\n Define a CONSTANT using common naming conventions. Give it a STRING OR NUMERIC value.",
			answer: /^var\s+[A-Z]+\s?=\s?(("\w*")|(\d+.?\d*));$/
		}
	},
	level3: {
		question0: {
			msg: "Question 0:\n Define an ARRAY of FIVE INTEGERS.",
			answer: /^var\s+\w+\s?=\s?\[(\d+\,\s?){4}\d\];$/
		},
		question1: {
			msg: "Question 1:\n Define an ARRAY of THREE STRINGS.",
			answer: /^var\s+\w+\s?=\s?\[("\w+"\,\s?){2}"\w+"\];$/
		},
		question2: {
			msg: "Question 2:\n Define an ASSOCIATIVE ARRAY where the KEYS are INTEGERS and the VALUES are STRINGS. Give it THREE KEY:VALUE pairs.",
			answer: /^var\s+\w+\s?=\s?\{\s?(\d+:\s+"\w*"\,\s*){2}(\d+:\s+"\w*")\s*\};$/
		}, 
		question3: {
			msg: "Question 3:\n Define an ASSOCIATIVE ARRAY where the VALUES are STRINGS. Give it THREE KEY:VALUE pairs, and name the KEYS 'one', 'two', and 'three'.",
			answer: /^var\s+\w+\s?=\s?\{\s?(("|')\w+("|'):\s+"\w*"\,\s*){2}(("|')\w+("|'):\s+"\w*")\s*\};$/
		},
		question4: {
			msg: "Question 4:\n Define an OBJECT. Name it 'myObj', and give it THREE PROPERTIES. Name the PROPERTIES: favColor, favInt, and favDay and make each value your favorite color, integer, and day respectively.",
			answer: /^var\s+myObj\s?=\s?\{\s?favColor:\s?"\w+"\,\s*favInt:\s?\d+\,\s*favDay:\s?"\w+"\s?\};$/
		}
	}
}