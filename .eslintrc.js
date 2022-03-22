const OFF = 0;
const ERROR = 2;
const WARN = 1;

module.exports = {
  'parser': '@typescript-eslint/parser',
  'plugins': ['@typescript-eslint'],
  'extends': [
    'eslint:recommended',
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  'env': {
    'node': true,
    'es6': true
  },
  'rules': {
    // 消除未使用的变量，函数和函数的参数
    'no-unused-vars': [ERROR, { args: 'none' }],
    // 'no-unused-vars': [WARN, {args: 'none'}],

    'jsx-quotes': [WARN, 'prefer-single'],

    'indent': [WARN, 2],

    'quotes': [WARN, 'single'],
    // 'quotes': [WARN, 'double'],

    // 语句强制分号结尾
    // "semi": [WARN, "never"],
    'semi': [WARN, 'always'],

    // 如果一个变量不会被重新赋值，最好使用const进行声明。
    'prefer-const': WARN,

    // 不允许多个空行
    'no-multiple-empty-lines': WARN,

    // 函数定义时括号前面要不要有空格
    'space-before-function-paren': [WARN, 'always'],

    // 要求箭头函数的箭头之前和之后有空格
    'arrow-spacing': WARN,

    // 要求在注释前有空白
    'spaced-comment': [WARN, 'always'],

    // 禁用行尾空格
    'no-trailing-spaces': WARN,

    // 在变量声明、数组字面量、对象字面量、函数参数 和 序列中禁止在逗号前使用空格,要求在逗号后使用一个或多个空格
    'comma-spacing': [WARN, { before: false, after: true }],

    // 禁止分号周围的空格
    'semi-spacing': [ERROR, { before: false, after: true }],

    // 禁止出现多个空格而且不是用来作缩进的
    'no-multi-spaces': WARN,

    // 控制逗号前后的空格
    // 'comma-spacing': [ERROR, { 'before': false, 'after': true }],

    // 函数调用时 函数名与()之间不能有空格
    'no-spaced-func': WARN,

    // 块语句内行首行尾是否要空行
    // 'padded-blocks': 1,

    // 文末需要回车
    'eol-last': WARN,

    // 变量声明后是否需要空一行
    // 'newline-after-var': WARN,
    'newline-after-var': OFF,

    // 要求 return 语句以前有一空行
    'newline-before-return': ERROR,


    // 每个定义了 setter 的属性设置一个 getter
    'accessor-pairs': OFF,

    // 规则警告设置者是否在没有获取者的情况下定义
    'brace-style': [ERROR, '1tbs'],

    // 'consistent-return': OFF,

    // 在强制执行成员表达式中的换行符一致性
    'dot-location': [ERROR, 'property'],

    // 尽可能使用点符号样式来维护代码一致性并提高代码可读性
    'dot-notation': [ERROR, { allowPattern: '^(error|warn)$' }],

    // 消除类型不安全的等式操作符
    eqeqeq: [ERROR, 'allow-null'],

    // 'keyword-spacing': [ERROR, {after: true, before: true}],

    // 此规则不允许按位运算符
    'no-bitwise': OFF,
    'no-console': OFF,

    // 要求函数声明和可选的变量声明位于程序的根节点或函数的主体中
    'no-inner-declarations': [ERROR, 'functions'],
    // 禁止在逻辑表达式，条件表达式，声明，数组元素，对象属性，序列和函数参数周围使用多个空格。
    // 'no-multi-spaces': ERROR,

    'no-restricted-syntax': [ERROR, 'WithStatement'],

    // 消除阴影变量声明
    'no-shadow': ERROR,

    // 消除对程序状态没有影响的未使用的表达式
    'no-unused-expressions': WARN,

    // 在遇到对尚未声明的标识符的引用时发出警告
    'no-use-before-define': OFF,
    // 这条规则旨在标记2个文字的连接，当它们可以合并成一个文字时。文字可以是字符串或模板文字。
    'no-useless-concat': OFF,

    // 此规则将强化块之前的间距一致性。它只适用于不以新行开始的块。
    'space-before-blocks': ERROR,
    // 在函数括号之前强制执行一致的间距
    // 'space-before-function-paren': OFF,
    // 此规则强制将typeof表达式与有效的字符串文字进行比较。
    'valid-typeof': [ERROR, { requireStringLiterals: true }],

    // 此规则禁止不必要地使用计算属性键。
    'no-useless-computed-key': OFF,

    'no-var': ERROR,
    // 此规则要求或不允许严格的模式指令。
    // 'strict': ERROR,

    // 此规则强制执行最大行长度以增加代码的可读性和可维护性
    'max-len': OFF,
  }
};
