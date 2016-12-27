const Maybe = require('data.maybe')

const { Just, Nothing, fromNullable } = Maybe

describe('fromNullable', ()=>{
	it('should return Just value if not null', ()=>{
		expect( fromNullable(0).getOrElse() ).toBe(0)
		expect( fromNullable('').getOrElse() ).toBe('')
		expect( fromNullable(Infinity).getOrElse() ).toBe(Infinity)
		expect( fromNullable(NaN).getOrElse() ).toBeNaN()
	})
	it('should return Nothing if the value is null or undefined', ()=>{
		expect( fromNullable(null).getOrElse('?') ).toBe('?')		
		expect( fromNullable(undefined).getOrElse('?') ).toBe('?')		
	})
})

describe('cata', ()=>{
	it('should call the Just method on a Just value', ()=>{
		let spyJust = jasmine.createSpy('just')
		let spyNothing = jasmine.createSpy('nothing')
		Just(10).cata({
			Just: spyJust,
			Nothing: spyNothing
		})
		expect(spyJust).toHaveBeenCalledWith(10)
		expect(spyNothing).not.toHaveBeenCalled()
	})
	it('should call the Nothing method on Nothing', ()=>{
		let spyJust = jasmine.createSpy('just')
		let spyNothing = jasmine.createSpy('nothing')
		Nothing().cata({
			Just: spyJust,
			Nothing: spyNothing			
		})
		expect( Nothing().getOrElse('?') ).toBe('?')
		expect(spyJust).not.toHaveBeenCalled()
		expect(spyNothing).toHaveBeenCalledWith()
	})
})
