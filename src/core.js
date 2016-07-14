import { List, Map } from 'immutable';

export function setEntries(state, entries) {
  return state.set('entries', List(entries));
}

function getWinners(voteObject) {
  if (!voteObject) {
    return [];
  }

  const [a, b] = voteObject.get('pair');
  const aVotes = voteObject.getIn(['tally', a], 0);
  const bVotes = voteObject.getIn(['tally', b], 0);
  if (aVotes > bVotes) {
    return [a];
  } else if (bVotes > aVotes) {
    return [b];
  }

  return [a, b];
}

export function next(state) {
  const entries = state.get('entries').concat(getWinners(state.get('vote')));
  if (entries.size === 1) {
    return state.remove('vote')
      .remove('entries')
      .set('winner', entries.first());
  }

  return state.merge({
    vote: Map({ pair: entries.take(2) }),
    entries: entries.skip(2),
  });
}

export function vote(state, entry) {
  return state.updateIn(
    ['vote', 'tally', entry],
    0,
    (tally) => {
      return tally + 1;
    }
  );
}

