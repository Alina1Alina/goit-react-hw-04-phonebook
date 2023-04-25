import PropTypes from 'prop-types';

export const Filter = ({ changeFilter, filter }) => {
  return (
    <div>
      <h2>Find contacts by name</h2>
      <label>
        <input onChange={changeFilter} type="text" value={filter} />
      </label>
    </div>
  );
};

Filter.propTypes = {
  changeFilter: PropTypes.func.isRequired,
  filter: PropTypes.string.isRequired,
};
