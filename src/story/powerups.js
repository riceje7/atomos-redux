var powerups = {
	level0: {
		consolePU: "(START TRANSMISSION)\n\n     You have obtained the CONSOLE POWERUP! With the CONSOLE POWERUP you are free to use the console to enter commands at anytime, not just when prompted. However, you must remember the SYNTAX rules of ATOMOS, as an incorrect statement in the console could alert the virus and it will dispatch enemies to your location.\n\n(END TRANSMISSION)",
		syntaxPU: "(START TRANSMISSION)\n\n     You have obtained the SYNTAX POWERUP! With this POWERUP you can now decrypt the other POWERUPS throughout the world to learn their power, and gain control over the NATA. There are some important things\nto remember when you are coding in Atomos. Here are a few tips to keep you safe:\n\n     1. All STATEMENTS must end with a semi-colon (;), not each line but each STATEMENT. You will learn about what a STATEMENT consists of when you collect more POWERUPS\n   2. To see the commands you have available to you use the 'help()' command in the console, it will list each command and what it does.\n\n(END TRANSMISSION)"
	},
	level1: {
		booleanPU: '(START TRANSMISSION)\n\n     You have obtained the BOOLEAN POWERUP! With the BOOLEAN POWERUP you can make VARIABLES have a BOOLEAN value. Essentially a BOOLEAN value is a VARIABLE with only two states, either true or false. It\'s kind of like a light switch, either ON or OFF.\n\n     Technically speaking only the following values will evaluate to a false value: 0, -0, false, NaN (stands for Not a Number), null, undefined, or an empty string(""). All other values including any OBJECT or even the string "false" will evaluate to true.\n\n     To assign a VARIABLE a BOOLEAN value the simplest way just assign it directly, as such: var myBool = true; Pretty simple right? There is also a Boolean OBJECT, denoted by the capital "B". In Javascript a Boolean OBJECT is just a wrapper for the primitive boolean values. To define a VARIABLE using the Boolean OBJECT, use the following syntax: var myBool = new Boolean(false). Notice how even though we are defining the variable using the Boolean OBJECT, the PARAMETER (false in this case, more on that later though) is still a primitive boolean value (notice the lowercase "b"?).\n\n     One last thing, any OBJECT whose value is not undefined or null, to include a Boolean OBJECT whose value is false, will evaluate to true in a conditional statement (you\'ll learn about conditional statements later once you discover those POWERUPS).\n\n(END TRANSMISSION)',
		nanPU: "(START TRANSMISSION)\n\n     You have obtained the NaN POWERUP! With this POWERUP you can test to see if different values are a number or more precisely if they are NOT a number. To do this you will use the FUNCTION (more on those when you discover the FUNCTIONS POWERUP) isNaN().\n\n       The proper syntax is as follows: isNaN(37); Where '37' or the PARAMETER is the value to be tested. It's that simple.\n\n     It is important to remember that while NaN is a primitive value, it is rarely ever used in a program. It is, most commonly, the value returned when a mathematical operation fails, or when a FUNCTION trying to parse a number fails. As such you may never find a reason to assign a VARIABLE the NaN value, but rather find that you need to test if a value is NaN, hence the FUNCTION isNaN().\n\n(END TRANSMISSION)",
		nullPU: "(START TRANSMISSION)\n\n     You have obtained the NULL POWERUP! With this POWERUP you may assign and test for NULL values. While it may seem that NULL is lacking a value, it is actually quite the contrary. A NULL value is defined as an 'empty' value. A NULL VARIABLE will return a value, which just happens to be 'null', unlike an UNDEFINED VARIABLE.\n\n       So a VARIABLE with the NULL value is defined as 'null' or to think of it another way, it is defined as having 'no value'. But it is in fact defined.\n\n       NULL values are useful when you need to define a VARIABLE before using it but don't want to, or can't yet, give it any other value. For instance in an OBJECT you may have a property, we'll call it 'myProp', and you need that property to be able to be accessed by the FUNCTIONS of the OBJECT but you can't define it when the OBJECT is initialized, because myProp's value is dependant upon another object that has yet to be initialized. So you set myProp's value to NULL for the time being, until such a time as the dependent OBJECT is intialized.\n\n     You will assign a NULL value just like any other value: var myNull = null;\n\n(END TRANSMISSION)",
		numberPU: "(START TRANSMISSION)\n\n     You have obtained the NUMBER POWERUP! With this powerful POWERUP you have gained the ability to define and use NUMBER values in Atomos. This POWERUP encompasses all NUMBERS in Atomos. It includes integers, floating point numbers, and a few special values associated with the NUMBER OBJECT, which as you may have guessed is another wrapper like the BOOLEAN OBJECT. But this time the value being wrapped is a NUMBER and not a BOOLEAN value.\n\n            The proper syntax to define a NUMBER OBJECT is like so: var myNum = new Number(value) where 'value' is some number. However if you want to use any one of 5 of the NUMBER OBJECT's special values. These values are:\n     MAX_VALUE\n          The largest positive representable number.  The largest negative representable number is -MAX_VALUE.\n     MIN_VALUE\n          The smallest positive representable number -- that is, the positive number closest to zero (without actually being zero).  The smallest negative representable number is -MIN_VALUE.\n     NaN\n          Special 'not a number' value.\n     NEGATIVE_INFINITY\n          Special value representing negative infinity; returned on overflow.\n     POSITIVE_INFINITY\n          Special value representing infinity; returned on overflow.\n\n     To assign a VARIABLE one of these special values just assign it this way:\n     var myNum = POSITIVE_INFINITY;\n\nYou can assign a VARIABLE any number in the same way:\n     var myNum = 4;\n     Or\n     var myNum = 2e10;\n\n     NUMBERS are very valuable in Javascript and Atomos like, they can be used to track the size, location, direction, and velocity of an object in a space. It can be used to measure things and to count things, and truly a near infinite list of possible uses. So pay attention to the things you learn. You may even be able to find a way to manipulate or change Atomos itself.\n\n(END TRANSMISSION)",
		stringPU: "(START TRANSMISSION)\n\n     You have obtained the STRING POWERUP! With this almighty POWERUP you will gain an understanding of the power of STRINGS. A string is simple another value, except this time it is a set of alpha-numric and special characters surrounded by either single-quotes ('') or by double-quotes (\"\").\n     While a STRING is mearly another value, it performs a special function. It is how we store and transfer information. Information stored in VARIABLES and CONSTANTS, and transferred either from one VARIABLE to another, or a VARIABLE to a FUNCTION or OBJECT. Now this information, it can have a near infinite number of different values with near infinite uses. Like for instance,\n     var myString = \"hello world!\";\n can mean many different things. In one instance it can be a message to a user from the program, in another a passphrase for a security question. Each STRING is subjective to each VARIABLE, FUNCTION, and OBJECT, and equally the program and programmer.\n\n       It is important to use consistancy in meaning when working with STRINGS.\n\n     STRINGS may be initialized one of two ways, either directly using single- or double-quotes:\n     var myString = \"hello world!\"; or using the STRING OBJECT and assigning the variable with a new STRING OBJECT:\n     var myString = new String(value);\n     Where value is some string of characters surrounded by single- or double-quotes.\n\n(END TRANSMISSION)",
		undefinedPU: "(START TRANSMISSION)\n\n     You have obtained the UNDEFINED POWERUP. With this POWERUP you will gain an understanding of what an UNDEFINED value really is. An UNDEFINED value is a value that has yet to be defined. Unlike an NULL value which is a value, UNDEFINED is the only may to distinguish a VARIABLE as having no set value.\n\n     Think of it this way, if I set 'x' to 10 like so:\n          var x = 10;\nThen x has a value of 10. If I then set 'x' to NULL like this:\n          x = null;\n then x, which still has a value, is equal to NULL. However if the first thing I did was:\n          var x;\nYou can see I didn't give x a value if we were to log x right now what do you think the output would be? Well It would actually be a ReferenceError telling you the VARIBALE is UNDEFINED, but do you know why? What happens when you log a VARIABLE is the VARIABLE'S value is looked up and output as a STRING. However because we have yet to define 'x', we have no value in relation to the VARIABLE 'x' so we are trying to access something that while it exists has no value. As such, Javascript interprets this as a mistake and outputs the ReferenceError.\n\n(END TRANSMISSION)"
	},
	level2: {
		constantsPU: "(START TRANSMISSION)\n\n     You have obtained the CONSTANTS POWERUP. With this powerup you will gain the knowledge of what a CONSTANT is and how they are used. A CONSTANT value is one that once defined is not- or cannot be changed during runtime of the program. CONSTANTS serve a valuable function, they allow us to define a value in one place and then we simply use its identifier in many places. This is done to make it easier to change the value while writing the code. Some browsers support the 'const' keyword when defining CONSTANTS, however the major convention in most languages, whether they provide support for CONSTANTS or not, is to make its identifier or name all capital letters. For all intents and purposes the following to code segments behave the same way:\n\n          const MY_CONST = 9.8;\nOr\n          var MY_CONST = 9.8;\n\n     Javascript does not yet have official universal support for the 'const' keyword and as such to avoid confusion and unpredictable behavior it is safest to use the 'var' keyword and the all-caps convention to denote a value that should not be changed during runtime.\n\n(END TRANSMISSION)",
		variablesPU: "(START TRANSMISSION)\n\n     You have obtained the VARIABLE POWERUP. You've already heard a lot of talk about VARIABLES and probably have a few questions about them, and with this POWERUP you should gain a good understanding of what a VARIABLE is and how we use them.\n     A VARIABLE is, technically speaking, a memory location, with an associated name or identifier that holds some value. That value can be any of the PRIMITIVE DATATYPES you've learned about, it can also be a FUNCTION, OBJECT or CLASS. A VARIABLE is defined with the keyword 'var', followed by an identifier which is followed by the equals siqn (=) and finally some value. Here are some different ways to define a VARIABLE using the 'var' keyword:\n\n     1) var x = true;\n\n     2) var myFunc = function(){ return someValue; }\n]n      3) var myStr = new String(\"hello world!\")\n\n     As you can tell defining a VARIABLE is super easy!\n\n(END TRANSMISSION)"
	},
	level3: {
		arrayPU: "hello world",
		associativeArrayPU: "hello world",
		objectPU: "hello world"
	},
	level4: {
		forPU: "",
		ifPU: "",
		whilePU: ""
	},
	level5: {
		functionsPU: "",
		parametersPU: ""
	},
	level6: {
		classesPU: ""
	},
}