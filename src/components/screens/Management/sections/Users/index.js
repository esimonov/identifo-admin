import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import UsersPlaceholder from './Placeholder';
import UserList from './UserList';
import UserSearch from './UserSearch';
import Button from '~/components/shared/Button';
import { fetchUsers } from '~/modules/users/actions';
import addIcon from '~/assets/icons/plus.svg';
import loadingIcon from '~/assets/icons/loading.svg';

class UsersSection extends Component {
  constructor() {
    super();

    this.state = {
      searchQuery: '',
    };

    this.handleSearch = this.handleSearch.bind(this);
  }

  componentDidMount() {
    this.props.fetchUsers();
  }

  handleSearch(searchQuery) {
    this.props.fetchUsers({ search: searchQuery });
    this.setState({ searchQuery });
  }

  render() {
    const { users, fetching } = this.props;
    const { searchQuery } = this.state;

    if (!users.length && !fetching && !searchQuery) {
      return (
        <section className="iap-management-section">
          <UsersPlaceholder />
        </section>
      );
    }

    return (
      <section className="iap-management-section">
        <p className="iap-management-section__title">
          Users
          <Button
            disabled={fetching}
            icon={fetching ? loadingIcon : addIcon}
          >
            Add user
          </Button>
        </p>

        <p className="iap-management-section__description">
          Look for users, edit, delete them and add new ones.
        </p>

        <UserSearch
          timeout={400}
          onChange={this.handleSearch}
        />

        <UserList loading={fetching} users={users} />
      </section>
    );
  }
}

UsersSection.propTypes = {
  fetchUsers: PropTypes.func.isRequired,
  users: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    email: PropTypes.string,
    latestLogin: PropTypes.string,
    numberOfLogins: PropTypes.number,
  })),
  fetching: PropTypes.bool,
};

UsersSection.defaultProps = {
  users: [],
  fetching: false,
};

const mapStateToProps = state => ({
  fetching: state.users.fetching,
  users: state.users.list,
});

const actions = {
  fetchUsers,
};

export default connect(mapStateToProps, actions)(UsersSection);
