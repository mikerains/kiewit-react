import PropTypes from "prop-types";

export const coursePropType = {
  title: PropTypes.string.isRequired,
  authorId: PropTypes.number.isRequired,
  category: PropTypes.string.isRequired
};
