let { curry } = require('ramda')

let { Maybe } = require('ramda-fantasy')
let { Just, Nothing, maybe } = Maybe

const show = (...x) => console.log(...x)

// If division is not possible, return Nothing{}
const safeDiv = 
// curry(
	(n, d) => d === 0 
		? Nothing() 
		: Just(n / d)
// )

show('Example 1.1: ', safeDiv(1, 2), safeDiv(1, 0))

//'getOrElse' provides default value in case of Nothing
show
(	'Example 1.2: '
, safeDiv(1, 2)
	.getOrElse('Division impossible!')
, safeDiv(1, 0)
	.getOrElse('Division impossible!')
)

// maybe apply function, or else return default value
show(
	'Example 1.3: '
	, maybe('Default!', x => x + 1)(safeDiv(1, 2))
	, maybe('Default!', x => x + 1)(safeDiv(1, 0))
)





// If prop is not defined, return Nothing{}
const lookup = 
// curry(
	(k, obj) => k in obj 
		? Just(obj[k]) 
		: Nothing()
// )

show('Example 2.1: ', lookup('a', {a: 5}), lookup('a', {b: 5}))

show
(	'Example 2.2: '
,	lookup('foo', { foo: 'bar' })
	.getOrElse('baz') // 'bar'
,	lookup('fee', { foo: 'bar' })
	.getOrElse('baz') // 'bar'
,	'|' +	lookup('a', {a: ''})
		.getOrElse('No value!') + '|'
)


