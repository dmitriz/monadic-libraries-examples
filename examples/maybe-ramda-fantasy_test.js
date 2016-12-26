const { any, none, curry } = require('ramda')
const { Maybe } = require('ramda-fantasy')

const { Nothing, isNothing, Just, isJust, maybe, of } = Maybe


// safe division 
const safeDiv = (n, d) =>  d === 0
	? Nothing() 
	: Just(n / d)

// safe object property lookup
const safeLookup = (k, obj) => k in obj 
		? Just(obj[k]) 
		: Nothing()

describe('getOrElse', ()=>{
	it('should return the valid value', ()=>{
		expect(safeDiv(1, 2).getOrElse('?')).toBe(0.5)
		expect(safeDiv(1, Infinity).getOrElse('?')).toBe(0)
		expect(safeDiv(Infinity, Infinity).getOrElse('?')).toBeNaN()
		expect(safeLookup('a', {a: 42, b: []}).getOrElse('?')).toBe(42)
		expect(safeLookup('a', {a: '', c: 0}).getOrElse('?')).toBe('')
	})
	it('should return default for invalid values', ()=>{
		expect(safeDiv(1, 0).getOrElse('?')).toBe('?')
		expect(safeLookup('a', {b: []}).getOrElse('?')).toBe('?')
		expect(safeLookup('', {a: []}).getOrElse('?')).toBe('?')
	})
})

describe('maybe', ()=>{
	it('should apply function to valid values', ()=>{
		expect(maybe('?', x => x+1)(safeDiv(1, 2))).toBe(1.5)
		expect(maybe('?', x => x+1)(safeLookup('a', {a: -1}))).toBe(0)
	})
	it('should return default instead of applying function for invalid values', ()=>{
		expect(maybe('?', x => x+1)(safeDiv(11, 0))).toBe('?')
		expect(maybe('?', x => x+1)(safeLookup('a', {b: -1}))).toBe('?')
	})
})

describe('map', ()=>{
	it('should apply map to valid values', ()=>{
		expect( safeDiv(1, 2).map(x => x-1).getOrElse() ).toBe(-0.5)
	})
	it('should return nothing when trying to apply map to invalid values', ()=>{
		expect( safeDiv(22, 0).map(x => x-1).getOrElse('?')).toBe('?')
		expect( safeLookup('aa', {}).map(x => x-1).getOrElse('?')).toBe('?')
	})
})

describe('chain', ()=>{
	it('should apply function to valid value and extract the raw result from monad', ()=>{
		expect( safeDiv(1, 2).chain(x => x-1) ).toBe(-0.5)
		expect( safeDiv(1, 2).chain(curry(safeDiv)(2)).getOrElse() ).toBe(4)
		expect( safeLookup('a', {a: {b: 5}}).chain(curry(safeLookup)('b')).getOrElse() ).toBe(5)
	})
	it('should return Nothing if chaining any function onto Nothing', ()=>{
		expect( isNothing(safeDiv(11, 0).chain(x => x-1) )).toBeTruthy()	
		expect( safeLookup('a', {b: {b: 5}}).chain(curry(safeLookup)('b')).getOrElse('?') ).toBe('?')
	})
	it('should return Nothing if chaining with function that evaluates to Nothing', ()=>{
		let firstLookup = safeLookup('a', {a: {}})
		expect( isNothing(firstLookup) ).not.toBeTruthy()
		expect( isNothing(firstLookup.chain(curry(safeLookup)('b')) )).toBeTruthy()	
	})
})

describe('of', ()=>{
	it('should wrap any value into Maybe monad', ()=>{
		expect( of(-1).getOrElse() ).toBe(-1)
		expect( isJust(of('')) ).toBeTruthy()
		expect( isJust(of(null)) ).toBeTruthy()
	})
})

describe('ap', ()=>{
	it('should apply Just map to Just value and return Just result', ()=>{
		expect( Just(x => x+2).ap(safeDiv(1, 2)).getOrElse() ).toBe(2.5)
	})
	it('should return Nothing if applying Nothing to Just value', ()=>{
		expect(
			Nothing().ap(safeDiv(1, 2)).getOrElse('?')
		).toBe('?')
	})
	it('should return Nothing if applying Just function to Nothing', ()=>{
		expect(
			Just(x => x+2).ap(safeDiv(1, 0)).getOrElse('?')
		).toBe('?')
	})
})

// reduce :: Foldable f => f a ~> ((b, a) -> b, b) -> b
// https://github.com/fantasyland/fantasy-land#reduce-method
describe('reduce', ()=>{
	it('Just(raw) should apply function f(acc, a) with as f(init val, raw)', ()=>{
		expect(
			// a acts on 'acc' by division
			// then Just(2) acts on 10 by division
			Just(2).reduce((acc, a) => acc / a, 10)
		).toBe(10 / 2)
	})
	it('Nothing() should ignore the function and return initial value', ()=>{
		expect(
			Nothing().reduce((acc, a) => acc / a, 10)
		).toBe(10)
	})
	it('should not uncurry iterator functions', ()=>{
		expect(
			// curried division
			Just(2).reduce(acc => a => acc / a, 10)
		).not.toBe(10 / 2)		
	})

})
