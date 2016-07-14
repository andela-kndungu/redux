import { expect } from 'chai';
import { List, Map } from 'immutable';

describe('immuutability', () => {
  describe('a number', () => {
    function increment(currentState) {
      return currentState + 1;
    }

    it('is immutable', () => {
      const state = 42;
      const nextState = increment(state);

      expect(nextState).to.equal(43);
      expect(state).to.equal(42);
    });
  });

  describe('a list', () => {
    function addItem(currentState, newItem) {
      return currentState.push(newItem);
    }

    it('is immutable', () => {
      const state = List.of('Trainspotting', '28 Days Later');
      const newState = addItem(state, 'Sunshine');

      expect(newState).to.equal(List.of(
        'Trainspotting',
        '28 Days Later',
        'Sunshine'
      ));

      expect(state).to.equal(List.of(
        'Trainspotting',
        '28 Days Later'
      )
      );
    });
  });

  describe('a tree', () => {
    function addMovie(currentState, movie) {
      return currentState.update('movies', (moviesList) => {
        return moviesList.push(movie);
      });
    }

    it('is immutable', () => {
      const state = Map({ movies: List.of(
        'Trainspotting',
        '28 Days Later'),
      });

      const nextState = addMovie(state, 'Sunshine');
      const expectedState = Map({
        movies: List.of(
          'Trainspotting',
          '28 Days Later',
          'Sunshine'),
      });

      const originalState = Map({ movies: List.of(
        'Trainspotting',
        '28 Days Later'),
      });

      expect(nextState).to.equal(expectedState);
      expect(state).to.equal(originalState);
    });
  });
});

