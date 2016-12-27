const { curry, any, none, lift, invoker, add } = require('ramda')

describe('lift', ()=>{
	it('should lift curried function to arrays', ()=>{
		// applies lexicographic order - iterate last array first
		expect( lift(a => b => a+b)([1,2,3], [10,20]) ).toEqual([11, 21, 12, 22, 13, 23])
		expect( lift(a => b => c => a - b * c)([10, 20], [5], [2, 1]) ).toEqual([0, 5, 10, 15])
	})
})


// Turns a named method with a specified arity into a function that can be called directly supplied with arguments and a target object.
// The returned function is curried and accepts arity + 1 parameters where the final parameter is the target object.

// Number → String → (a → b → … → n → Object → *)
describe('invoker', ()=>{
	it('should invoke specified arity and method as function', ()=>{
		// arity 0 - slice with 0 args
		expect( invoker(0, 'slice')('gh') ).toBe('gh')
		// arity 1 - slice with 1 arg
		expect( invoker(1, 'slice')(2, 'efgh') ).toBe('gh')
		// arity 2 - slice with 2 args
		expect( invoker(2, 'slice')(2, 4, 'efgh') ).toBe('gh')
	})
  it('curries the method call', ()=>{
    expect( 
    	invoker(2, 'concat')(3)(4)([1, 2])
    ).toEqual([1, 2, 3, 4])
    expect( 
    	invoker(2, 'concat')(3, 4)([1, 2])
    ).toEqual([1, 2, 3, 4])
    expect( 
    	invoker(2, 'concat')(3, 4, [1, 2])
    ).toEqual([1, 2, 3, 4])
  })

})
